"use strict";

module.exports = class Iata {
  constructor(code, departureTax) {
    this.code = code;
    this.departureTax = departureTax;
  }

  setCode(code) {
    this.code = code;

    return this;
  }

  setDepartureTax(departureTax) {
    this.departureTax = departureTax;

    return this;
  }

  setFlight(flight) {
    this.flight = [];
    this.addFlight(flight);

    return this;
  }

  addFlight(flight) {
    if (this.flight === undefined) {
      this.flight = [];
    }

    this.flight.push(flight);

    return this;
  }
};
