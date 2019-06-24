"use strict";

module.exports = class Capture {
    static fromJSON(json) {
        let capture = new Capture();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                let value = json[property];

                if (property === 'requestDateTime' || property === 'dateTime' || property === 'refundDateTime') {
                    value = new Date(value);
                }

                capture[property] = value;
            }
        }

        return capture;
    }
};