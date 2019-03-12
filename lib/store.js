"use strict";

const Environment = require("./enrivonment.js");

module.exports = class Store {
    constructor(token, filiation, environment = Environment.production()) {
        this.token = token;
        this.filiation = filiation;
        this.environment = environment;
    }
};