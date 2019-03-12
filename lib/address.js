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
};