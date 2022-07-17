const $h1 = document.querySelector('h1')
const $btnAtender = document.querySelector('button');
const $small = document.querySelector('small');
const $alert = document.querySelector('.alert');
const $lblPendientes = document.getElementById('lblPendientes');

// ==========================================================
// URL
// ==========================================================
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location.href = 'index.html';
  throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');

$h1.innerText = escritorio;
$alert.style.display = 'none';

// ==========================================================
// Eventos socket
// ==========================================================
const socket = io();

socket.on('connet', () => {
  $btnAtender.disabled = false;
})

socket.on('disconnect', () => {
  $btnAtender.disabled = true;
})

socket.on('tickets-pendientes', (payload) => {
  console.log('conteo', payload);
  if (payload === 0) {
    $alert.style.display = 'none';
  } else {
    $lblPendientes.innerText = payload;
  }
  $lblPendientes.innerText = payload;
})

// ==========================================================
// Eventos del DOM
// ==========================================================
$btnAtender.addEventListener('click', () => {

  // emitimos el evento al controller para que atienda el ticket
  socket.emit('atender-ticket', { escritorio }, (payload) => {
    // console.log(payload);
    const { ok, ticket, message } = payload;

    if (!ok) {
      $alert.style.display = 'block';
      $small.innerText = 'Nadie';
      $alert.innerText = message;
      return;
    }

    $small.innerText = `Ticket ${ticket.numero}`;

  })
})