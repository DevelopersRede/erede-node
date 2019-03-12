"use strict";

const Url = require("./url");
const Cart = require("./cart");
const Iata = require("./iata");
const ThreeDSecure = require("./threedsecure");

module.exports = class Transaction {
    constructor(amount, reference) {
        this.amount = amount;
        this.reference = reference;
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

    addUrl(url, kind = Url.CALLBACK) {
        if (this.urls === undefined) {
            this.urls = [];
        }

        this.urls.push(new Url(url, kind));

        return this;
    }

    antifraud(environment) {
        let cart = Cart();
        cart.environment = environment;

        this.antifraudRequired = true;
        this.cart = cart;

        return this;
    }

    creditCard(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName) {
        return this.card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, Transaction.CREDIT);
    }

    debitCard(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName) {
        return this.card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, Transaction.DEBIT);
    }

    card(cardNumber, securityCode, expirationMonth, expirationYear, cardHolderName, kind) {
        this.cardNumber = cardNumber;
        this.securityCode = securityCode;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cardHolderName = cardHolderName;
        this.kind = kind;

        return this;
    }

    autoCapture(capture = true) {
        if (!capture && this.kind === Transaction.DEBIT) {
            throw "Debit transactions will always be captured";
        }

        this.capture = capture;

        return this;
    }

    setIata(code, departureTax) {
        this.iata = new Iata(code, departureTax);

        return this;
    }

    mcc(softDescriptor, paymentFacilitatorID, subMerchant) {
        this.softDescriptor = softDescriptor;
        this.paymentFacilitatorID = paymentFacilitatorID;
        this.subMerchant = subMerchant;

        return this;
    }

    threeDSecure(onFailure = ThreeDSecure.DECLINE_ON_FAILURE, embed = true, directoryServerTransactionId = "", threeDIndicator = "1") {
        this.threeDSecure = new ThreeDSecure();
        this.threeDSecure.onFailure = onFailure;
        this.threeDSecure.embedded = embed;
        this.threeDSecure.threeDIndicator = threeDIndicator;
        this.threeDSecure.DirectoryServerTransactionId = directoryServerTransactionId;

        return this;
    }
};