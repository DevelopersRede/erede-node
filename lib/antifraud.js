"use strict";

module.exports = class Antifraud {
  constructor() {
    this.success = false;
  }

  static fromJSON(json) {
    let antifraud = new Antifraud();

    for (let property in json) {
      if (json.hasOwnProperty(property)) {
        antifraud[property] = json[property];
      }
    }

    return antifraud;
  }

  setRecommendation(recommendation) {
    this.recommendation = recommendation;

    return this;
  }

  setRiskLevel(riskLevel) {
    this.riskLevel = riskLevel;

    return this;
  }

  setScore(score) {
    this.score = score;

    return this;
  }

  setSuccess(success) {
    this.success = success;

    return this;
  }

  isSuccess() {
    return this.success;
  }
};
