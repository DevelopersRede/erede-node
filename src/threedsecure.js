

module.exports = class ThreeDSecure {
  constructor() {
    this.embedded = true;
    this.threeDIndicator = '1';
  }

  static get CONTINUE_ON_FAILURE() {
    return 'continue';
  }

  static get DECLINE_ON_FAILURE() {
    return 'decline';
  }

  static fromJSON(json) {
    const threeds = new ThreeDSecure();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      threeds[jsonKeys[i]] = json[jsonKeys[i]];
    }

    return threeds;
  }
};
