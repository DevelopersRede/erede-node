"use strict";

module.exports = class Address {
  static get BILLING() {
    return 1;
  }

  static get SHIPPING() {
    return 2;
  }

  static get BOTH() {
    return 3;
  }

  static get APARTMENT() {
    return 1;
  }

  static get HOUSE() {
    return 2;
  }

  static get COMMERCIAL() {
    return 3;
  }

  static get OTHER() {
    return 4;
  }

  setAddress(address) {
    this.address = address;

    return this;
  }

  setAddresseeName(addresseeName) {
    this.addresseeName = addresseeName;

    return this;
  }

  setCity(city) {
    this.city = city;

    return this;
  }

  setComplement(complement) {
    this.complement = complement;

    return this;
  }

  setNeighbourhood(neighbourhood) {
    this.neighbourhood = neighbourhood;

    return this;
  }

  setNumber(number) {
    this.number = number;

    return this;
  }

  setState(state) {
    this.state = state;

    return this;
  }

  setType(type) {
    this.type = type;

    return this;
  }

  setZipCode(zipcode) {
    this.zipCode = zipcode;

    return this;
  }
};
