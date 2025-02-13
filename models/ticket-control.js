const path = require('path');
const fs = require('fs');

class Ticket {

  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {

  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  // crea el obj para guardarla en el json
  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }
  }

  // Carga la data al iniciar la app
  init() {
    const data = require('../db/data.json');
    const { ultimo, hoy, tickets, ultimos4 } = data;

    if (hoy === this.hoy) {
      this.ultimo = ultimo;
      this.tickets = tickets;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDb();
    }
  }

  // Data creada en el constructor a data.json
  guardarDb() {

    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))

  }

  // Crea y guarda un nuevo ticket
  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDb();
    return 'Ticket ' + ticket.numero;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) return null;

    const ticket = this.tickets.shift();

    ticket.escritorio = escritorio;

    // Muestra en pantalla el ticket a ser atendido
    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) this.ultimos4.splice(-1, 1);

    this.guardarDb();
    return ticket;
  }
}

module.exports = {
  TicketControl
}