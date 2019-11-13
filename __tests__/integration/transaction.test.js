const eRede = require('../../lib/erede');
const store = require('../store');
const Environment = require('../../lib/environment');
const Address = require('../../lib/address');
const Consumer = require('../../lib/consumer');
const transaction = require('../transaction');

describe('Transactions', () => {
  test('if user can create a transaction', async () => {
    transaction.reference = `ref${Math.ceil(Date.now())}`;

    const response = await new eRede(store).create(transaction);

    expect(response.returnCode).toBe('00');
  });

  test('if user can create a transaction with installments', async () => {
    transaction.reference = `ref${Math.ceil(Date.now())}`;
    transaction.installments = 3;

    const response = await new eRede(store).create(transaction);

    expect(response.returnCode).toBe('00');
    expect(response.installments).toBe(3);
  });

  test('if a user can create a transaction adding infomation gateway and module', async () => {
    transaction.reference = `ref${Math.ceil(Date.now())}`;
    transaction.setAdditional(1234, 56);

    const response = await new eRede(store).create(transaction);
    expect(response.returnCode).toBe('00');
    expect(response.additional.gateway).toBe('1234');
    expect(response.additional.module).toBe('56');
  });

  test('if user can create a transaction with antifraud', async () => {
    transaction.reference = `ref${Math.ceil(Date.now())}`;

    const environment =
      process.env.NODE_ENV === 'test'
        ? Environment.sandbox()
        : Environment.production();

    const antifraud = transaction.setAntifraud(environment);
    antifraud
      .consumer('Fulano', 'fulano@mail.com', '09444956059')
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

    const response = await new eRede(store).create(transaction);
    expect(response.returnCode).toBe('00');
    expect(response.antifraud.success).toBe(true);
    expect(response.returnMessage).toBe('Success.');
  });
});
