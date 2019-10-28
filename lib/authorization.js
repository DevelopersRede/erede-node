"use strict";

module.exports = class Authorization {
  static fromJSON(json) {
    let authorization = new Authorization();

    for (let property in json) {
      if (json.hasOwnProperty(property)) {
        let value = json[property];

        if (
          property === "requestDateTime" ||
          property === "dateTime" ||
          property === "refundDateTime"
        ) {
          value = new Date(value);
        }

        authorization[property] = value;
      }
    }

    return authorization;
  }

  setAffiliation(affiliation) {
    this.affiliation = affiliation;

    return this;
  }

  setAmount(amount) {
    this.amount = amount;

    return this;
  }

  setAuthorizationCode(authorizationCode) {
    this.authorizationCode = authorizationCode;

    return this;
  }

  setCardBin(cardBin) {
    this.cardBin = cardBin;

    return this;
  }

  setCardHolderName(cardHolderName) {
    this.cardHolderName = cardHolderName;

    return this;
  }

  setDateTime(dateTime) {
    this.dateTime = new Date(dateTime);

    return this;
  }

  setInstallments(installments) {
    this.installments = installments;

    return this;
  }

  setKind(kind) {
    this.kind = kind;

    return this;
  }

  setLast4(last4) {
    this.last4 = last4;

    return this;
  }

  setNsu(nsu) {
    this.nsu = nsu;

    return this;
  }

  setOrigin(origin) {
    this.origin = origin;

    return this;
  }

  setReference(reference) {
    this.reference = reference;
  }

  setReturnCode(returnCode) {
    this.returnCode = returnCode;

    return this;
  }

  setReturnMessage(returnMessage) {
    this.returnMessage = returnMessage;

    return this;
  }

  setStatus(status) {
    this.status = status;

    return this;
  }

  setSubscription(subscription) {
    this.subscription = subscription;

    return this;
  }

  setTid(tid) {
    this.tid = tid;

    return this;
  }
};
