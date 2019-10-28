"use strict";

const Address = require("./address");
const Consumer = require("./consumer");
const Iata = require("./iata");

module.exports = class Cart {
  address(type = Address.BOTH) {
    let address = new Address();

    if ((type & Address.BILLING) === Address.BILLING) {
      this.billing = address;
    }

    if ((type & Address.SHIPPING) === Address.SHIPPING) {
      this.shipping = [address];
    }

    return address;
  }

  setBillingAddress(address) {
    this.billing = address;

    return this;
  }

  setShippingAddress(address) {
    this.shipping = [address];

    return this;
  }

  addItem(item) {
    if (this.items === undefined) {
      this.items = [];
    }

    this.items.push(item);

    return this;
  }

  addShippingAddress(shippingAddress) {
    if (this.shipping === null) {
      this.shipping = [];
    }

    this.shipping.push(shippingAddress);

    return this;
  }

  consumer(name, email, cpf) {
    let consumer = new Consumer(name, email, cpf);

    this.setConsumer(consumer);

    return consumer;
  }

  setConsumer(consumer) {
    this.consumer = consumer;

    return this;
  }

  setIata(code, departureTax, flight) {
    this.iata = new Iata(code, departureTax);
    this.iata.setFlight(flight);

    return this;
  }

  setEnvironment(environment) {
    this.environment = environment;

    return this;
  }
};
