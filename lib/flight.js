"use strinct";

const Passenger = require("./passenger");

module.exports = class Flight {
  constructor(number, from, to, date) {
    this.number = number;
    this.from = from;
    this.to = to;
    this.date = date;
  }

  addPassenger(passenger) {
    if (this.passenger === undefined) {
      this.passenger = [];
    }

    this.passenger.push(passenger);

    return this;
  }
};
