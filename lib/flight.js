"use strinct";

const Passenger = require("./passenger");

module.exports = class Flight {
    constructor(number, from, to, date) {
        this.number = number;
        this.from = from;
        this.to = to;
        this.date = date;
    }

    addPassenger(name, email, ticket) {
        if (this.passenger === undefined) {
            this.passenger = [];
        }

        this.passenger.push(new Passenger(name, email, ticket));

        return this;
    }
};