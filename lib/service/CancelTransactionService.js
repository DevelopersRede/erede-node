"use strict";

const TransactionService = require('./TransactionService');

module.exports = class CancelTransactionService extends TransactionService {
    constructor(store, transaction) {
        super(store);

        this.transaction = transaction;
    }

    getUrl() {
        return `${super.getUrl()}/${this.transaction.tid}/refunds`;
    }

    async execute() {
        return this.sendRequest(TransactionService.POST, JSON.stringify(this.transaction));
    }
};