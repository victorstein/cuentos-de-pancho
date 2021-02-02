export default class Model {
  constructor (data = {}) {
    Object.assign(this, data)
  }

  static deserialize (data: any): Model {
    return new this(data)
  }

  serialize (): Model {
    return this
  }
}

module.exports = Model
