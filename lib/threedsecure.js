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

    static fromJSON(json) {
        let threeds = new ThreeDSecure();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                threeds[property] = json[property];
            }
        }

        return threeds;
    }
};