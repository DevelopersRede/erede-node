require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const Store = require("../lib/store");
const Environment = require("../lib/environment");

let environment =
  process.env.NODE_ENV === "test"
    ? Environment.sandbox()
    : Environment.production();

let store = new Store(process.env.REDE_TOKEN, process.env.REDE_PV, environment);

module.exports = store;
