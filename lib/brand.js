"use strict";

module.exports = class Brand {
    static fromJSON(json) {
        let brand = new Brand();

        for (let property in json) {
            if (json.hasOwnProperty(property)) {
                brand[property] = json[property];
            }
        }

        return brand;
    }
};