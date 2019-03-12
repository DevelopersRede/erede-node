"use strict";

const Address = require("./address");
const Consumer = require("./consumer");
const Iata = require("./iata");

module.exports = class Cart {
    address(type = Address.BOTH) {
        let address = Address();

        if ((type & Address.BILLING) === Address.BILLING) {
            this.billing = address;
        }

        if ((type & Address.SHIPPING) === Address.SHIPPING) {
            this.shipping = [address];
        }

        return address;
    }

    addItem(item) {
        if (this.items === undefined) {
            this.items = [];
        }

        this.items.push(item);

        return this;
    }

    setConsumer(name, email, cpf) {
        this.consumer = new Consumer(name, email, cpf);

        return this.consumer;
    }

    setIata(code, departureTax, flight) {
        this.iata = new Iata(code, departureTax);
        this.iata.flight = flight;

        return this;
    }
};
