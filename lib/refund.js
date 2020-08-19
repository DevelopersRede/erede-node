'use strict';

module.exports = class Refund {
    static fromJSON(json) {
        let refund = new Refund();

        for (let property in json) {
            if (Object.prototype.hasOwnProperty.call(json, property)) {
                let value = json[property];

                if (property === 'requestDateTime' || property === 'dateTime' || property === 'refundDateTime') {
                    value = new Date(value);
                }

                refund[property] = value;
            }
        }

        return refund;
    }
};