const eRede = require("../lib/erede");
const Store = require("../lib/store");
const Environment = require("../lib/environment");

let store = new Store(
  "TOKEN",
  "PV",
  Environment.sandbox()
);

new eRede(store).getRefunds("10011910280828200220").then(transaction => {
  transaction.refunds.forEach(el => {
    console.log(`Transação cancelada : ${el.refundId}`);
  });
});
