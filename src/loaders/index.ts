import { Application } from 'express'
import { Service } from 'typedi'
import ExpressLoader from 'loaders/expressLoader'
import SentryLoader from './sentryLoader'

@Service()
class Loaders {
  constructor (
    private readonly express: ExpressLoader,
    private readonly sentry: SentryLoader
  ) {}

  load (): Application {
    try {
      // Initialize Express
      const app = this.express.start()
      // Initialize Log Rocket
      this.sentry.start()

      return app
    } catch (e) {
      throw new Error(`There was an error initializing your loaders 💥 -> ${e.message as string}`)
    }
  }
}

export default Loaders
