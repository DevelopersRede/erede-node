"use strict";

module.exports = class RedeError extends Error {
    constructor(message, code) {
        super(message);

        this.returnCode = code;
        this.returnMessage = message;
    }
};