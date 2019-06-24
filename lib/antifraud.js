"use strict";

module.exports = class Antifraud {
    constructor() {
        this.success = false;
    }

    static fromJSON(json) {
        let antifraud = new self();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                antifraud[property] = json[property];
            }
        }

        return antifraud;
    }
};