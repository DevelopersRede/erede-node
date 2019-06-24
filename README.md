# SDK Node.js

SDK de integração eRede

# Utilizando

## Autorizando uma transação

```js
const eRede = require('./lib/erede');
const Transaction = require('./lib/transaction');
const Store = require('./lib/store');
const Environment = require('./lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(10, "ref123").creditCard(
    '5448280000000007',
    '235',
    '12',
    '2020',
    'Fulano de Tal'
);

new eRede(store).create(transaction).then(transaction => {
    if (transaction.returnCode === "00") {
        console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
    }
});
```

Por padrão, a transação é capturada automaticamente; caso seja necessário apenas autorizar a transação, o método `Transaction.capture()` deverá ser chamado com o parâmetro `false`:

```js
const eRede = require('./lib/erede');
const Transaction = require('./lib/transaction');
const Store = require('./lib/store');
const Environment = require('./lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(10, "ref123").creditCard(
    '5448280000000007',
    '235',
    '12',
    '2020',
    'Fulano de Tal'
).autoCapture(false);

new eRede(store).create(transaction).then(transaction => {
    if (transaction.returnCode === "00") {
        console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
    }
});
```