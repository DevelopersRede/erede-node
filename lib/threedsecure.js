"use strict";

module.exports = class ThreeDSecure {
    constructor() {
        this.embedded = true;
        this.threeDIndicator = "1";
    }

    static get CONTINUE_ON_FAILURE() {
        return "continue";
    }

    static get DECLINE_ON_FAILURE() {
        return "decline";
    }
};