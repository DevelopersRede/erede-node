"use strict";

module.exports = class SubMerchant {
    constructor(mcc, city, country) {
        this.mcc = mcc;
        this.city = city;
        this.country = country;
    }
};