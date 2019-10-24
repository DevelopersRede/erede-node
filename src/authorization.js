

module.exports = class Authorization {
  static fromJSON(json) {
    const authorization = new Authorization();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      const property = jsonKeys[i];
      let value = json[property];
      if (property === 'requestDateTime' || property === 'dateTime' || property === 'refundDateTime') {
        value = new Date(value);
      }

      authorization[property] = value;
    }


    return authorization;
  }
};
