# SDK Node.js
[![Build Status](https://travis-ci.com/juliosouzam/erede-node.svg?branch=master)](https://travis-ci.com/juliosouzam/erede-node)

SDK de integração eRede

# Utilizando

## Autorizando uma transação

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === '00') {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

Por padrão, a transação é capturada automaticamente; caso seja necessário apenas autorizar a transação, o método `Transaction.capture()` deverá ser chamado com o parâmetro `false`:

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(10, `ref${parseInt(Date.now() / 1000)}`)
  .creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal')
  .autoCapture(false);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === '00') {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Autorizando uma transação com parcelamento

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000000)}`,
  3
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === '00') {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Adiciona informação adicional de gateway e módulo

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());
let transaction = new Transaction(10, `ref${parseInt(Date.now() / 1000000)}`, 2)
  .creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal')
  .setAdditional(1234, 56);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === '00') {
    console.log(`Transação autorizada com sucesso: ${transaction.tid}`);
  }
});
```

## Cria uma transação com Antifraude

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');
const Consumer = require('../lib/consumer');
const Address = require('../lib/address');

let environment = Environment.sandbox();
environment.setIp('127.0.0.1').setSessionId('NomeEstabelecimento-WebSessionID');

let store = new Store('TOKEN', 'PV', environment);

let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`,
  2
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

let antifraud = transaction.setAntifraud(environment);
antifraud
  .consumer('Fulano', 'fulano@mail.com', '11111111111')
  .setGender(Consumer.MALE)
  .setPhone('011', '999999999')
  .addDocument('RG', '111111111');

antifraud
  .address()
  .setAddresseeName('Fulano')
  .setAddress('Rua dos bobos')
  .setNumber('125')
  .setZipCode('01122123')
  .setNeighbourhood('Bairro legal')
  .setCity('Cidade Bonita')
  .setState('UF')
  .setType(Address.OTHER);

new eRede(store)
  .create(transaction)
  .then(transaction => {
    if (transaction.returnCode === '00') {
      antifraud = transaction.getAntifraud();
      console.log(`Transação autorizada com sucesso: ${transaction.tid}`);

      console.log(`Antifraude: ${antifraud.isSuccess() ? 'Sucesso' : 'Falha'}`);
      console.log(`Score: ${antifraud.score}`);
      console.log(`Nível de Risco: ${antifraud.riskLevel}`);
      console.log(`Recomendação: ${antifraud.recommendation}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
```

## Cria uma transação com Antifraude para companhias aéreas

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');
const Consumer = require('../lib/consumer');
const Phone = require('../lib/phone');
const Address = require('../lib/address');
const Passenger = require('../lib/passenger');
const Flight = require('../lib/flight');

let environment = Environment.sandbox();
environment.setIp('127.0.0.1').setSessionId('NomeEstabelecimento-WebSessionID');

let store = new Store('TOKEN', 'PV', environment);

let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`,
  2
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

let antifraud = transaction.setAntifraud(environment);
antifraud
  .consumer('Fulano', 'fulano@mail.com', '11111111111')
  .setGender(Consumer.MALE)
  .setPhone('011', '999999999')
  .addDocument('RG', '111111111');

antifraud
  .address()
  .setAddresseeName('Fulano')
  .setAddress('Rua dos bobos')
  .setNumber('125')
  .setZipCode('01122123')
  .setNeighbourhood('Bairro legal')
  .setCity('Cidade Bonita')
  .setState('UF')
  .setType(Address.OTHER);

antifraud.setIata(
  'code123',
  '250',
  new Flight(
    '123213',
    'Los Angeles',
    'New York',
    '2017-02-15T10:54:45-9:00'
  ).addPassenger(
    new Passenger('Arya Stark', 'lorem@ipsum.com', '32423432432').setPhone(
      new Phone('011', '912341234')
    )
  )
);

new eRede(store)
  .create(transaction)
  .then(transaction => {
    if (transaction.returnCode === '00') {
      antifraud = transaction.getAntifraud();
      console.log(`Transação autorizada com sucesso: ${transaction.tid}`);

      console.log(`Antifraude: ${antifraud.isSuccess() ? 'Sucesso' : 'Falha'}`);
      console.log(`Score: ${antifraud.score}`);
      console.log(`Nível de Risco: ${antifraud.riskLevel}`);
      console.log(`Recomendação: ${antifraud.recommendation}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
```

## Capturando uma transação

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());

new eRede(store)
  .capture(new Transaction(10).setTid('10011910280828200188'))
  .then(transaction => {
    if (transaction.returnCode === '00') {
      console.log(`Transação capturada com sucesso: ${transaction.tid}`);
    }
  });
```

## Cancelando uma transação

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());

new eRede(store)
  .cancel(new Transaction(10).setTid('10011910280828200220'))
  .then(transaction => {
    console.log(`Transação cancelada com sucesso: ${transaction.tid}`);
  });
```

## Consultando uma transação pelo ID

```js
const eRede = require('../lib/erede');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());

new eRede(store).getByTid('10011910280828200189').then(transaction => {
  console.log(
    `Transação consutada com sucesso: ${transaction.authorization.tid}, status: ${transaction.authorization.status}`
  );
});
```

## Consultando cancelamentos de uma transação

```js
const eRede = require('../lib/erede');
const Store = require('../lib/store');
const Environment = require('../lib/environment');

let store = new Store('TOKEN', 'PV', Environment.sandbox());

new eRede(store).getRefunds('10011910280828200220').then(transaction => {
  transaction.refunds.forEach(el => {
    console.log(`Transação cancelada : ${el.refundId}`);
  });
});
```

## Transação com autenticação

```js
const eRede = require('../lib/erede');
const Transaction = require('../lib/transaction');
const Store = require('../lib/store');
const Environment = require('../lib/environment');
const ThreeDSecure = require('../lib/threedsecure');
const Url = require('../lib/url');

let store = new Store('TOKEN', 'PV', Environment.sandbox());

let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

transaction.setThreeDSecure(ThreeDSecure.DECLINE_ON_FAILURE);
transaction.addUrl(
  'https://redirecturl.com/3ds/success',
  Url.THREE_D_SECURE_SUCCESS
);
transaction.addUrl(
  'https://redirecturl.com/3ds/failure',
  Url.THREE_D_SECURE_FAILURE
);

new eRede(store).create(transaction).then(transaction => {
  if (transaction.returnCode === '220') {
    console.log(
      `Redirecione o cliente para ${transaction.threeDSecure.url} para autenticação`
    );
  }
});
```
