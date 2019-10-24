const ERede = require('../../src/erede');
const Store = require('../../src/store');
const Environment = require('../../src/environment');
const Transaction = require('../../src/transaction');

test('should authorize a transaction', () => {
  const store = new Store(process.env.storeToken, process.env.storePV, Environment.sandbox());
  const transaction = new Transaction(10, Date.now()).creditCard(
    '5448280000000007',
    '235',
    '12',
    '2020',
    'Fulano',
  );

  return new ERede(store).create(transaction).then((resultOfTransaction) => {
    expect(resultOfTransaction.returnCode).toBe('00');
  });
});
