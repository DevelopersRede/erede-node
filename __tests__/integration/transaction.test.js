require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const eRede = require("../../lib/erede");
const Transaction = require("../../lib/transaction");
const Store = require("../../lib/store");
const Environment = require("../../lib/environment");

describe("Transactions", () => {
  let environment =
    process.env.NODE_ENV === "test"
      ? Environment.sandbox()
      : Environment.production();

  let store = new Store(
    process.env.REDE_TOKEN,
    process.env.REDE_PV,
    environment
  );

  test("if user can create a transaction", async () => {
    let transaction = new Transaction(
      10,
      `ref${Math.ceil(Date.now())}`
    ).creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal");

    const response = await new eRede(store).create(transaction);

    expect(response.returnCode).toBe("00");
  });
});
