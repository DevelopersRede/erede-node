const eRede = require("../lib/erede");
const Transaction = require("../lib/transaction");
const Store = require("../lib/store");
const Environment = require("../lib/environment");
const Consumer = require("../lib/consumer");
const Phone = require("../lib/phone");
const Address = require("../lib/address");
const Passenger = require("../lib/passenger");
const Flight = require("../lib/flight");

let environment = Environment.sandbox();
environment.setIp("127.0.0.1").setSessionId("NomeEstabelecimento-WebSessionID");

let store = new Store(
  "TOKEN",
  "PV",
  environment
);

let transaction = new Transaction(
  10,
  `ref${parseInt(Date.now() / 1000)}`,
  2
).creditCard("5448280000000007", "235", "12", "2020", "Fulano de Tal");

let antifraud = transaction.setAntifraud(environment);
antifraud
  .consumer("Fulano", "fulano@mail.com", "11111111111")
  .setGender(Consumer.MALE)
  .setPhone("011", "999999999")
  .addDocument("RG", "111111111");

antifraud
  .address()
  .setAddresseeName("Fulano")
  .setAddress("Rua dos bobos")
  .setNumber("125")
  .setZipCode("01122123")
  .setNeighbourhood("Bairro legal")
  .setCity("Cidade Bonita")
  .setState("UF")
  .setType(Address.OTHER);

antifraud.setIata(
  "code123",
  "250",
  new Flight(
    "123213",
    "Los Angeles",
    "New York",
    "2017-02-15T10:54:45-9:00"
  ).addPassenger(
    new Passenger("Arya Stark", "lorem@ipsum.com", "32423432432").setPhone(
      new Phone("011", "912341234")
    )
  )
);

new eRede(store)
  .create(transaction)
  .then(transaction => {
    if (transaction.returnCode === "00") {
      antifraud = transaction.getAntifraud();
      console.log(`Transação autorizada com sucesso: ${transaction.tid}`);

      console.log(`Antifraude: ${antifraud.isSuccess() ? "Sucesso" : "Falha"}`);
      console.log(`Score: ${antifraud.score}`);
      console.log(`Nível de Risco: ${antifraud.riskLevel}`);
      console.log(`Recomendação: ${antifraud.recommendation}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
