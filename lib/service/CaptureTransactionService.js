"use strict";

const TransactionService = require('./TransactionService');

module.exports = class CaptureTransactionService extends TransactionService {
    constructor(store, transaction) {
        super(store);

        this.transaction = transaction;
    }

    getUrl() {
        return `${super.getUrl()}/${this.transaction.tid}`;
    }

    execute() {
        return this.sendRequest(TransactionService.PUT, JSON.stringify(this.transaction));
    }
};