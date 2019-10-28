"use strict";

module.exports = class Item {
  constructor(id, quantity, type = Item.PHYSICAL) {
    this.id = id;
    this.quantity = quantity;
    this.type = type;
  }

  static get PHYSICAL() {
    return 1;
  }

  static get DIGITAL() {
    return 2;
  }

  static get SERVICE() {
    return 3;
  }

  static get AIRLINE() {
    return 4;
  }

  setAmount(amount) {
    this.amount = amount;

    return this;
  }

  setDescription(description) {
    this.description = description;

    return this;
  }

  setDiscount(discount) {
    this.discount = discount;

    return this;
  }

  setFreight(freight) {
    this.freight = freight;

    return this;
  }

  setId(id) {
    this.id = id;

    return this;
  }

  setQuantity(quantity) {
    this.quantity = quantity;

    return this;
  }

  setShippingType(shippingType) {
    this.shippingType = shippingType;

    return this;
  }

  setType(type) {
    this.type = type;

    return this;
  }
};
