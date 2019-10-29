require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const eRede = require("../../lib/erede");
const Transaction = require("../../lib/transaction");
const Store = require("../../lib/store");
const Environment = require("../../lib/environment");

describe("Transactions", () => {
  let store;

  beforeEach(() => {
    store = new Store("TOKEN", "PV", Environment.sandbox());
  });

  test("dois mais dois é quatro", () => {
    expect(2 + 2).toBe(4);
  });
});
