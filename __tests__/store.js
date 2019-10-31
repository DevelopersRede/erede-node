require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const Store = require('../lib/store');
const Environment = require('../lib/environment');

const environment =  process.env.NODE_ENV === 'test'
    ? Environment.sandbox()
    : Environment.production();

const store = new Store(
  process.env.REDE_TOKEN,
  process.env.REDE_PV,
  environment,
);

module.exports = store;
