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
};