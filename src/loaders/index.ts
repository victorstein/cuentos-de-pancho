import { Application } from 'express'
import { Service } from 'typedi'
import ExpressLoader from 'loaders/expressLoader'

@Service()
class Loaders {
  constructor (
    private express: ExpressLoader,
  ) {}

  load (): Application {
    try {
      const app = this.express.start()

      return app
    } catch (e) {
      throw new Error(`There was an error initializing your loaders 💥 -> ${e.message}`)
    }
  }
}

export default Loaders