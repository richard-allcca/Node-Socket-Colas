const $lblNuevoTicket = document.getElementById('lblNuevoTicket');
const $btnCrear = document.querySelector('button');

const socket = io();


socket.on('connet', () => {
  $btnCrear.disabled = false;
})

socket.on('disconnect', () => {
  $btnCrear.disabled = true;
})

socket.on('ultimo-ticket', (ultimo) => {
  $lblNuevoTicket.innerText = `Último ticket: ${ultimo}`;
})


$btnCrear.addEventListener('click', () => {

  // Ejecuta "siguiente-ticket" en el controller
  socket.emit('siguiente-ticket', null, (ticket) => {

    // recibe el ticket crado
    $lblNuevoTicket.innerText = ticket;
  })
})
