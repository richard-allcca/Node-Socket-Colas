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

  get getToJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }
  }

  init() {
    const data = require('../db/data.json');
    const { ultimo, hoy, tickets, ultimos4 } = data;

    if (hoy === this.hoy) {
      this.ultimo = ultimo;
      this.tickets = tickets;
      this.ultimos4 = ultimos4;
    } else {
      // es otro dia 
      this.guardarDb();
    }
  }

  guardarDb() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.getToJson))
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDb();
    return 'Ticket ' + ticket.numero;
  }

  atenderTikect(escritorio) {
    // console.log(this.ultimos4)
    if (this.tickets.length === 0) {
      return null;
    }

    // elimina el primer objt y lo retorna
    const ticket = this.tickets.shift();
    // al ticket retornado le agregamos el param escritorio
    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }

    this.guardarDb();
    return ticket;
  }

}

module.exports = {
  TicketControl
}