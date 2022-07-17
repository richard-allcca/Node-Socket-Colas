const $lblTicket1 = document.getElementById('lblTicket1');
const $lblTicket2 = document.getElementById('lblTicket2');
const $lblTicket3 = document.getElementById('lblTicket3');
const $lblTicket4 = document.getElementById('lblTicket4');
const $lblEscritorio1 = document.getElementById('lblEscritorio1');
const $lblEscritorio2 = document.getElementById('lblEscritorio2');
const $lblEscritorio3 = document.getElementById('lblEscritorio3');
const $lblEscritorio4 = document.getElementById('lblEscritorio4');

const socket = io();

socket.on('ultimos-cuatro', (payload) => {

  const audio = new Audio('../audio/new-ticket.mp3')
  audio.play();

  const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
  console.log(ticket1);
  if (ticket1) {
    $lblTicket1.innerText = 'Ticket ' + ticket1.numero;
    $lblEscritorio1.innerText = ticket1.escritorio;
  } else {
    $lblTicket1.innerText = 'Sin ticket'
    $lblEscritorio1.innerText = 'Escritorio 0'
  }
  if (ticket2) {
    $lblTicket2.innerText = 'Ticket ' + ticket2.numero;
    $lblEscritorio2.innerText = ticket2.escritorio;
  } else {
    $lblTicket2.innerText = 'Sin ticket'
    $lblEscritorio2.innerText = 'Escritorio 0'
  }
  if (ticket3) {
    $lblTicket3.innerText = 'Ticket ' + ticket3.numero;
    $lblEscritorio3.innerText = ticket3.escritorio;
  } else {
    $lblTicket3.innerText = 'Sin ticket'
    $lblEscritorio3.innerText = 'Escritorio 0'
  }
  if (ticket4) {
    $lblTicket4.innerText = 'Ticket ' + ticket4.numero;
    $lblEscritorio4.innerText = ticket4.escritorio;
  } else {
    $lblTicket4.innerText = 'Sin ticket'
    $lblEscritorio4.innerText = 'Escritorio 0'
  }
})