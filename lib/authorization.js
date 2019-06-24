"use strict";

module.exports = class Authorization {
    static fromJSON(json) {
        let authorization = new Authorization();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                let value = json[property];

                if (property === 'requestDateTime' || property === 'dateTime' || property === 'refundDateTime') {
                    value = new Date(value);
                }

                authorization[property] = value;
            }
        }

        return authorization;
    }
};