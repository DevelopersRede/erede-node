

module.exports = class Refund {
  static fromJSON(json) {
    const refund = new Refund();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      const property = jsonKeys[i];
      let value = json[property];
      if (property === 'requestDateTime' || property === 'dateTime' || property === 'refundDateTime') {
        value = new Date(value);
      }

      refund[property] = value;
    }

    return refund;
  }
};
