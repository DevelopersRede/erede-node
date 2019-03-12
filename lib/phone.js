"use strict";

module.exports = class Phone {
    constructor(ddd, number, type = Phone.CELLPHONE) {
        this.ddd = ddd;
        this.number = number;
        this.type = type;
    }

    static get CELLPHONE() {
        return 1;
    }

    static get HOME() {
        return 2;
    }

    static get WORK() {
        return 3;
    }

    static get OTHER() {
        return 4;
    }
};