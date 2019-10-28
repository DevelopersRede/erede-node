"use strict";

module.exports = class Passenger {
  constructor(name, email, ticket) {
    this.name = name;
    this.email = email;
    this.ticket = ticket;
  }

  setEmail(email) {
    this.email = email;

    return this;
  }

  setName(name) {
    this.name = name;

    return this;
  }

  setPhone(phone) {
    this.phone = phone;

    return this;
  }

  setTicket(ticket) {
    this.ticket = ticket;

    return this;
  }
};
