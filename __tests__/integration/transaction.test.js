require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const eRede = require('../../lib/erede');
const Transaction = require('../../lib/transaction');
const store = require('../store');

describe('Transactions', () => {
  test('if user can create a transaction', async () => {
    const transaction = new Transaction(
      10,
      `ref${Math.ceil(Date.now())}`
    ).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');

    const response = await new eRede(store).create(transaction);

    expect(response.returnCode).toBe('00');
  }, 10000);
});
