"use strict";

const PRODUCTION = "https://api.userede.com.br/erede";
const SANDBOX = "https://api.userede.com.br/desenvolvedores";
const VERSION = "v1";

module.exports = class Environment {
    constructor(baseUrl, version = VERSION) {
        this.ip = "";
        this.sessionId = "";
        this.endpoint = `${baseUrl}/${version}`;
    }

    static production() {
        return new Environment(PRODUCTION, VERSION);
    }

    static sandbox() {
        return new Environment(SANDBOX, VERSION)
    }
};