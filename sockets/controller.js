const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();


const socketController = (socket) => {

  // ==========================================================
  // Emite el evento cuando un cliente se conecta
  // ==========================================================
  socket.emit('ultimo-ticket', ticketControl.ultimo);
  socket.emit('ultimos-cuatro', ticketControl.ultimos4);
  socket.emit('tickets-pendientes', ticketControl.tickets.length);

  // ==========================================================
  // Escucha el evento del cliente en "nuevo-ticket" 
  // ==========================================================
  socket.on('siguiente-ticket', (payload, callback) => {

    const siguienteTicket = ticketControl.siguiente();
    callback(siguienteTicket);
    // notifica cuando hay nuevo ticket
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

  })

  // ==========================================================
  // Escucha el evento del cliente en "atender-ticket" 
  // ==========================================================
  socket.on('atender-ticket', (payload, callback) => {

    const { escritorio } = payload;    
    if (!escritorio) {
      return callback({
        ok: false,
        message: 'El escritorio es necesario'
      })
    }

    const tickeParaAtender = ticketControl.atenderTikect(escritorio)

    // Notifica cambios a la pantalla publica
    socket.broadcast.emit('ultimos-cuatro', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    // Validamos que el ticket exista y lo enviamos al cliente
    if (!tickeParaAtender) {
      callback({
        ok: false,
        message: 'No hay tickets pendientes'
      })
    } else {
      callback({
        ok: true,
        ticket: tickeParaAtender
      })
    }
  })

}



module.exports = {
  socketController
}

