const Transaction = require('../lib/transaction');

module.exports = new Transaction(
  10,
  `ref${Math.ceil(Date.now())}`,
  3
).creditCard('5448280000000007', '235', '12', '2020', 'Fulano de Tal');
