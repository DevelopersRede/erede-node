const eRede = require("../lib/erede");
const Transaction = require("../lib/transaction");
const Store = require("../lib/store");
const Environment = require("../lib/environment");

let store = new Store(
  "TOKEN",
  "PV",
  Environment.sandbox()
);

new eRede(store)
  .cancel(new Transaction(10).setTid("10011910280828200220"))
  .then(transaction => {
      console.log(`Transação cancelada com sucesso: ${transaction.tid}`);
  });
