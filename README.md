# SDK Node.js

SDK de integração eRede

# Utilizando

## Autorizando uma transação

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123").creditCard(
  "5448280000000007",
  "235",
  "12",
  "2020",
  "Fulano de Tal"
);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

Por padrão, a transação é capturada automaticamente; caso seja necessário apenas autorizar a transação, o método `Transaction.capture()` deverá ser chamado com o parâmetro `false`:

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123")
  .creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal")
  .autoCapture(false);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Autorizando uma transação com parcelamento

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123", 2).creditCard(
  "5448280000000007",
  "235",
  "12",
  "2020",
  "Fulano de Tal"
);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Adiciona informação adicional de gateway e módulo

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123", 2)
  .creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal")
  .setAdditional(1234, 56);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Autorizando uma transação com MCC dinâmico

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");
const SubMerchant = require("./lib/submerchant");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123", 2)
  .creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal")
  .setMcc(
    "COMERCIODOJOÃO",
    "25416985759",
    new SubMerchant(1234, "Fortaleza", "Brasil")
  );

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Autorizando uma transação IATA

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");

let store = new Store("TOKEN", "PV", Environment.sandbox());
let transaction = new Transaction(10, "ref123", 2)
  .creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal")
  .setIata("code123", "199");

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Cria uma transação com Antifraude

```js
const eRede = require("./lib/erede");
const Transaction = require("./lib/transaction");
const Store = require("./lib/store");
const Environment = require("./lib/environment");
const Consumer = require("./lib/consumer");
const Phone = require("./lib/phone");

let environment = Environment.production();
environment.setIp("127.0.0.1").setSessionId("NomeEstabelecimento-WebSessionID");

let store = new Store("TOKEN", "PV", environment);
let transaction = new Transaction(10, "ref123", 2)
  .creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal")
  .setIata("code123", "199");

let antifraud = transaction.setAntifraud(environment);
antifraud
  .consumer("John", "john@doe.com", "11111111111")
  .setGender(Consumer.MALE)
  .setPhone(new Phone("011", "111111111"));

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```
