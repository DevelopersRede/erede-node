const eRede = require("../lib/erede");
const Transaction = require("../lib/transaction");
const Store = require("../lib/store");
const Environment = require("../lib/environment");
const ThreeDSecure = require("../lib/threedsecure");
const Url = require("../lib/url");

let store = new Store(
  "TOKEN",
  "PV",
  Environment.sandbox()
);

let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`
).creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal");

transaction.setThreeDSecure(ThreeDSecure.DECLINE_ON_FAILURE);
transaction.addUrl(
  "https://redirecturl.com/3ds/success",
  Url.THREE_D_SECURE_SUCCESS
);
transaction.addUrl(
  "https://redirecturl.com/3ds/failure",
  Url.THREE_D_SECURE_FAILURE
);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "220") {
    console.log(
      `Redirecione o cliente para ${transaction.threeDSecure.url} para autenticação`
    );
  }
});
