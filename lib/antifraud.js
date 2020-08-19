'use strict';

module.exports = class Antifraud {
    constructor() {
        this.success = false;
    }

    static fromJSON(json) {
        let antifraud = new this();
        for (let property in json) {

            if (Object.prototype.hasOwnProperty.call(json, property)) {
                antifraud[property] = json[property];
            }
        }

        return antifraud;
    }
};