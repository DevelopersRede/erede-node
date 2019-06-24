"use strict";

const Cart = require("./cart");
const Url = require("./url");
const Iata = require("./iata");
const ThreeDSecure = require("./threedsecure");
const Capture = require("./capture");
const Authorization = require("./authorization");
const Additional = require("./additional");
const Antifraud = require("./antifraud");
const Refund = require('./refund');

module.exports = class Transaction {
    constructor(amount, reference) {
        if (amount !== undefined) {
            this.amount = amount;
        }

        if (reference !== undefined) {
            this.reference = reference;
        }
    }

    static get CREDIT() {
        return "credit";
    }

    static get DEBIT() {
        return "debit";
    }

    static get ORIGIN_EREDE() {
        return 1;
    }

    static get ORIGIN_VISA_CHECKOUT() {
        return 4;
    }

    static get ORIGIN_MASTERPASS() {
        return 6;
    }

    static fromJSON(json) {
        let transaction = new Transaction(json.amount, json.reference);

        for (let property in json) {
            if (!json.hasOwnProperty(property)) {
                continue;
            }

            let value = json[property];
            let i = 0;
            let t = 0;

            switch (property) {
                case 'refunds':
                    transaction.refunds = [];

                    for (i = 0, t = value.length; i < t; i++) {
                        transaction.refunds.push(Refund.fromJSON(value[i]));
                    }

                    break;
                case 'urls':
                    transaction.urls = [];

                    for (i = 0, t = value.length; i < t; i++) {
                        transaction.urls.push(Url.fromJSON(value[i]));
                    }

                    break;
                case 'capture':
                    transaction.capture = Capture.fromJSON(value);

                    break;
                case 'authorization':
                    transaction.authorization = Authorization.fromJSON(value);

                    break;
                case 'additional':
                    transaction.additional = Additional.fromJSON(value);

                    break;
                case 'threeDSecure':
                    transaction.threeDSecure = ThreeDSecure.fromJSON(value);

                    break;
                case 'antifraud':
                    transaction.antifraud = Antifraud.fromJSON(value);

                    break;
                case 'requestDateTime':
                case 'dateTime':
                case 'refundDateTime':
                    transaction[property] = new Date(value);
                    break;
                default:
                    transaction[property] = value;
            }
        }

        return transaction;
    }

    /**
     *
     * @param gateway
     * @param module
     * @returns {module.Transaction}
     */
    setAdditional(gateway, module) {
        this.additional = new Additional(gateway, module);

        return this;
    }

    /**
     *
     * @param url
     * @param kind
     * @returns {module.Transaction}
     */
    addUrl(url, kind = Url.CALLBACK) {
        if (this.urls === undefined) {
            this.urls = [];
        }

        this.urls.push(new Url(url, kind));

        return this;
    }

    /**
     *
     * @param environment
     * @returns {module.Transaction}
     */
    setAntifraud(environment) {
        let cart = Cart();
        cart.environment = environment;

        this.antifraudRequired = true;
        this.cart = cart;

        return this;
    }

    /**
     *
     * @param cardNumber
     * @param securityCode
     * @param expirationMonth
     * @param expirationYear
     * @param cardHolderName
     * @returns {module.Transaction}
     */
    creditCard(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName) {
        return this.card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, Transaction.CREDIT);
    }

    /**
     *
     * @param cardNumber
     * @param securityCode
     * @param expirationMonth
     * @param expirationYear
     * @param cardHolderName
     * @returns {module.Transaction}
     */
    debitCard(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName) {
        return this.card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, Transaction.DEBIT);
    }

    /**
     *
     * @param cardNumber
     * @param securityCode
     * @param expirationMonth
     * @param expirationYear
     * @param cardHolderName
     * @param kind
     * @returns {module.Transaction}
     */
    card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, kind) {
        this.cardNumber = cardNumber;
        this.securityCode = securityCode;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cardHolderName = cardHolderName;
        this.kind = kind;

        return this;
    }

    /**
     *
     * @param capture
     * @returns {module.Transaction}
     */
    autoCapture(capture = true) {
        if (!capture && this.kind === Transaction.DEBIT) {
            throw "Debit transactions will always be captured";
        }

        this.capture = capture;

        return this;
    }

    /**
     *
     * @param code
     * @param departureTax
     * @returns {module.Transaction}
     */
    setIata(code, departureTax) {
        this.iata = new Iata(code, departureTax);

        return this;
    }

    /**
     *
     * @param softDescriptor
     * @param paymentFacilitatorID
     * @param subMerchant
     * @returns {module.Transaction}
     */
    setMcc(softDescriptor, paymentFacilitatorID, subMerchant) {
        this.softDescriptor = softDescriptor;
        this.paymentFacilitatorID = paymentFacilitatorID;
        this.subMerchant = subMerchant;

        return this;
    }

    /**
     *
     * @param onFailure
     * @param embed
     * @param directoryServerTransactionId
     * @param threeDIndicator
     * @returns {module.Transaction}
     */
    setThreeDSecure(onFailure = ThreeDSecure.DECLINE_ON_FAILURE, embed = true, directoryServerTransactionId = "", threeDIndicator = "1") {
        this.threeDSecure = new ThreeDSecure();
        this.threeDSecure.onFailure = onFailure;
        this.threeDSecure.embedded = embed;
        this.threeDSecure.threeDIndicator = threeDIndicator;
        this.threeDSecure.DirectoryServerTransactionId = directoryServerTransactionId;

        return this;
    }
};