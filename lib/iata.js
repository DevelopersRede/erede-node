"use strict";

module.exports = class Iata {
    constructor(code, departureTax) {
        this.code = code;
        this.departureTax = departureTax;
    }
};