"use strict";

const CancelTransactionService = require("./service/CancelTransactionService");
const CaptureTransactionService = require("./service/CaptureTransactionService");
const CreateTransactionService = require("./service/CreateTransactionService");
const GetTransactionService = require("./service/GetTransactionService");

module.exports = class eRede {
    constructor(store) {
        this.store = store;
    }

    async create(transaction) {
        let service = new CreateTransactionService(this.store, transaction);

        return service.execute();
    }

    cancel(transaction) {
        let service = new CancelTransactionService(this.store, transaction);

        return service.execute();
    }

    capture(transaction) {
        let service = new CaptureTransactionService(this.store, transaction);

        return service.execute();
    }

    getByTid(tid) {
        let service = new GetTransactionService(this.store);

        service.tid = tid;

        return service.execute();
    }

    getByReference(reference) {
        let service = new GetTransactionService(this.store);

        service.reference = reference;

        return service.execute();
    }

    getRefunds(tid) {
        let service = new GetTransactionService(this.store);

        service.tid = tid;
        service.refunds = true;

        return service.execute();
    }

    zero(transaction) {
        let amount = transaction.amount;
        let capture = transaction.capture;

        transaction.amount = 0;
        transaction.capture = true;

        transaction = this.create(transaction);

        transaction.amount = amount;
        transaction.capture = capture;

        return transaction;
    }
};