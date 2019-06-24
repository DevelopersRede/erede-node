"use strict";

const TransactionService = require('./TransactionService');

module.exports = class GetTransactionService extends TransactionService {
    constructor(store) {
        super(store);

        this.tid = undefined;
    }

    getUrl() {
        if (this.reference !== undefined) {
            return `${super.getUrl()}?reference=${this.reference}`;
        }

        if (this.tid === undefined) {
            throw new Error('You need to specify one: the tid or the reference');
        }

        if (this.refunds !== undefined) {
            return `${super.getUrl()}/${this.tid}/refunds`;
        }

        return `${super.getUrl()}/${this.tid}`;
    }

    execute() {
        return this.sendRequest(TransactionService.GET);
    }
};