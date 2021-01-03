export default class Model {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  static deserialize(data: any) {
    return new this(data);
  }

  serialize() {
    return this;
  }
}

module.exports = Model;