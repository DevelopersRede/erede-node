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
  .capture(new Transaction(10).setTid("10011910280828200188"))
  .then(transaction => {
    if (transaction.returnCode === "00") {
      console.log(`Transação capturada com sucesso: ${transaction.tid}`);
    }
  });
