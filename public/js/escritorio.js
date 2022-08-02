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

socket.on('tickets-pendientes', (pendientes) => {

  if (pendientes === 0) {
    $lblPendientes.style.display = 'none';
  } else {
    $lblPendientes.style.display = '';
    $lblPendientes.innerText = pendientes;
  }
})

// ==========================================================
// Eventos del DOM
// ==========================================================
$btnAtender.addEventListener('click', () => {

  // emitimos el evento al controller para que atienda el ticket
  socket.emit('atender-ticket', { escritorio }, (payload) => {

    const { ok, ticket, message } = payload;
    if (!ok) {
      $small.innerText = 'Nadie';
      $btnAtender.disabled = true;
      return $alert.style.display = '';
    }
    $small.innerText = `Ticket ${ticket.numero}`;

  })
})