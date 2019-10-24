

const CALLBACK = 'callback';
const THREE_D_SECURE_FAILURE = 'threeDSecureFailure';
const THREE_D_SECURE_SUCCESS = 'threeDSecureSuccess';

module.exports = class Url {
  constructor(url, kind = Url.CALLBACK) {
    this.url = url;
    this.kind = kind;
  }

  static get CALLBACK() {
    return CALLBACK;
  }

  static get THREE_D_SECURE_FAILURE() {
    return THREE_D_SECURE_FAILURE;
  }

  static get THREE_D_SECURE_SUCCESS() {
    return THREE_D_SECURE_SUCCESS;
  }

  static fromJSON(json) {
    const url = new Url();

    const jsonKeys = Object.keys(json);
    for (let i = jsonKeys.length; i >= 0; i -= 1) {
      url[jsonKeys[i]] = json[jsonKeys[i]];
    }

    return url;
  }
};
