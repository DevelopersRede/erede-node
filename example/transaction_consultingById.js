const eRede = require("../lib/erede");
const Store = require("../lib/store");
const Environment = require("../lib/environment");

let store = new Store(
  "TOKEN",
  "PV",
  Environment.sandbox()
);

new eRede(store).getByTid("10011910280828200189").then(transaction => {
  console.log(
    `Transação consutada com sucesso: ${transaction.authorization.tid}, status: ${transaction.authorization.status}`
  );
});
