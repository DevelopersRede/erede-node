

const CancelTransactionService = require('./service/CancelTransactionService');
const CaptureTransactionService = require('./service/CaptureTransactionService');
const CreateTransactionService = require('./service/CreateTransactionService');
const GetTransactionService = require('./service/GetTransactionService');

module.exports = class eRede {
  constructor(store) {
    this.store = store;
  }

  async create(transaction) {
    const service = new CreateTransactionService(this.store, transaction);

    return service.execute();
  }

  cancel(transaction) {
    const service = new CancelTransactionService(this.store, transaction);

    return service.execute();
  }

  capture(transaction) {
    const service = new CaptureTransactionService(this.store, transaction);

    return service.execute();
  }

  getByTid(tid) {
    const service = new GetTransactionService(this.store);

    service.tid = tid;

    return service.execute();
  }

  getByReference(reference) {
    const service = new GetTransactionService(this.store);

    service.reference = reference;

    return service.execute();
  }

  getRefunds(tid) {
    const service = new GetTransactionService(this.store);

    service.tid = tid;
    service.refunds = true;

    return service.execute();
  }

  zero(transaction) {
    const { amount } = transaction;
    const { capture } = transaction;

    transaction.amount = 0;
    transaction.capture = true;

    transaction = this.create(transaction);

    transaction.amount = amount;
    transaction.capture = capture;

    return transaction;
  }
};
