const $lblNuevoTicket = document.getElementById('lblNuevoTicket');
const $btnCrear = document.querySelector('button');

const socket = io();

// ==========================================================
// socket.on escucha eventos del de socket.emit
// ==========================================================

socket.on('connet', () => {
  $btnCrear.disabled = false;
})

socket.on('disconnect', () => {
  $btnCrear.disabled = true;
})

socket.on('ultimo-ticket', (ultimo) => {
  $lblNuevoTicket.innerText = `Último ticket: ${ultimo}`;
})

// ==========================================================
// Evento del DOM
// ==========================================================
$btnCrear.addEventListener('click', () => {

  // ejecuta el evento "siguiente-ticket" en el controller
  socket.emit('siguiente-ticket', null, (ticket) => {
    // console.log(ticket);
    $lblNuevoTicket.innerText = `Ticket ${ticket}`;
  })

})
