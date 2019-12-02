module.exports = class Additional {
  constructor(gateway, module) {
    this.gateway = gateway;
    this.module = module;
  }

  static fromJSON(json) {
    const additional = new Additional();

    for (const property in json) {
      if (json.hasOwnProperty(property)) {
        additional[property] = json[property];
      }
    }

    return additional;
  }

  setGateway(gateway) {
    this.gateway = gateway;

    return this;
  }

  setModule(module) {
    this.module = module;

    return this;
  }
};
