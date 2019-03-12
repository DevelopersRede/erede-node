"use strict";

const Phone = require("./phone");

module.exports = class Consumer {
    constructor(name, email, cpf) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }

    static get MALE() {
        return "M";
    }

    static get FEMALE() {
        return "F";
    }

    addDocument(type, number) {
        if (this.documents === undefined) {
            this.documents = [];
        }

        this.documents.push({type: type, number: number});

        return this;
    }

    setPhone(ddd, number, type = Phone.CELLPHONE) {
        this.phone = new Phone(ddd, number, type);

        return this;
    }
};