"use strict";

module.exports = class Additional {
    constructor(gateway, module) {
        this.gateway = gateway;
        this.module = module;
    }

    static fromJSON(json) {
        let additional = new Additional();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                additional[property] = json[property];
            }
        }

        return additional;
    }
};