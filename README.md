# SDK Node.js

SDK de integração eRede

# Utilizando

## Autorizando uma transação

```js
const eRede = require("../");
const Transaction = require("./transaction");

let transaction = new Transaction(10, "123").creditCard(
    "2102102102102100",
    "123",
    "11",
    "20",
    "Fulano de tal"
);

new eRede("pv", "token").create(transaction);

if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
}
```

Por padrão, a transação é capturada automaticamente; caso seja necessário apenas autorizar a transação, o método `Transaction.capture()` deverá ser chamado com o parâmetro `false`:

```js
const eRede = require("../");
const Transaction = require("./transaction");

let transaction = new Transaction(10, "123").creditCard(
    "2102102102102100",
    "123",
    "11",
    "20",
    "Fulano de tal"
).autoCapture(false);

new eRede("pv", "token").create(transaction);

if (transaction.returnCode === "00") {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
}
```