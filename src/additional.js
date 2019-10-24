

module.exports = class Additional {
  constructor(gateway, module) {
    this.gateway = gateway;
    this.module = module;
  }

  static fromJSON(json) {
    const additional = new Additional();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      additional[jsonKeys[i]] = json[jsonKeys[i]];
    }

    return additional;
  }
};
