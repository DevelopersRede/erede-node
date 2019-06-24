"use strict";

const TransactionService = require('./TransactionService');

module.exports = class CreateTransactionService extends TransactionService {
    constructor(store, transaction) {
        super(store);

        this.transaction = transaction;
    }

    async execute() {
        return await this.sendRequest(TransactionService.POST, JSON.stringify(this.transaction));
    }
};