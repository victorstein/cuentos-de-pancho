import { Application } from 'express'
import { Service } from 'typedi'
import ExpressLoader from 'loaders/expressLoader'
import LogRocketLoader from './logRocketLoader'

@Service()
class Loaders {
  constructor (
    private express: ExpressLoader,
    private logRocket: LogRocketLoader
  ) {}

  load (): Application {
    try {
      // Initialize Express
      const app = this.express.start()
      // Initialize Log Rocket
      this.logRocket.start()

      return app
    } catch (e) {
      throw new Error(`There was an error initializing your loaders 💥 -> ${e.message}`)
    }
  }
}

export default Loaders