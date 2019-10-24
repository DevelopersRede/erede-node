

module.exports = class Antifraud {
  constructor() {
    this.success = false;
  }

  static fromJSON(json) {
    const antifraud = new self();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      antifraud[jsonKeys[i]] = json[jsonKeys[i]];
    }


    return antifraud;
  }
};
