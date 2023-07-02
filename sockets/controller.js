const { TicketControl } = require("../models/ticket-control");
const ticketControl = new TicketControl();


const socketController = (socket) => {

  // Emite cuando un cliente se conecta
  socket.emit('ultimo-ticket', ticketControl.ultimo);
  socket.emit('estado-actual', ticketControl.ultimos4);
  socket.emit('tickets-pendientes', ticketControl.tickets.length);

  // Escucha la creación de un nuevo ticket
  socket.on('siguiente-ticket', (payload, callback) => {

    // Nuevo ticket
    const siguienteTicket = ticketControl.siguiente();

    callback(siguienteTicket); // ticket al cliente

    // notifica a todos los escritorios
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
  });

  // Escucha el evento y Notifica
  socket.on('atender-ticket', (payload, callback) => {

    const { escritorio } = payload;
    if (!escritorio) {
      return callback({
        ok: false,
        message: 'El escritorio es necesario'
      });
    }

    // Respuesta al cliente con callbak
    const ticket = ticketControl.atenderTikect(escritorio);
    if (!ticket) {
      callback({
        ok: false,
        message: 'No hay tickets pendientes'
      });
    } else {
      callback({
        ok: true,
        ticket: ticket
      });
    }

    // Notifica a la pantalla publica
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

    // Notifica al propio escritorio
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    // Notifica a todos los escritorios
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
  });

};

module.exports = {
  socketController
}
