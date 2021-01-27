import 'reflect-metadata'
import config from './config'
import Loaders from 'loaders'
import Container, { Service } from 'typedi'
import { Application, NextFunction, Request, Response } from 'express'
import Routes from 'routes'
import ErrorHandler from 'middlewares/errorHandler'
import NotFound from './middlewares/notFound'
import * as Sentry from '@sentry/node'

@Service()
class Init {
  constructor(
    private loaders: Loaders,
    private errorHandler: ErrorHandler,
    private notFound: NotFound,
    private routes: Routes
  ) {}

  waitForLoaders (): Application {
    try {
      // Initialize all the loaders
      const app = this.loaders.load()

      return app
    } catch (e) {
      throw new Error(e)
    }
  }

  async listen (app: Application, port: number = 3002): Promise<void> {
    // Create a promise to listen for errors on server listen
    return new Promise((resolve, reject) => {
      app.listen(port)
        .once('listening', () => resolve())
        .once('error', () => reject())
    })
  }

  async start () {
    try {
      // Get the express app
      const app = this.waitForLoaders()

      // Add the routes
      this.routes.getRoutes()
        .forEach((route) => app.use(route.endpoint, route.router))

      // Start listening
      await this.listen(app, config.PORT)

      // Alert that the server is already in place
      console.log(`Server running at http://localhost:${config.PORT} 🚀`)

      // Handle Errors
      app.use((err: ErrorHandler, _: Request, res: Response, __:NextFunction) => this.errorHandler.handleError(err, res))

      // Handle 404
      app.use(this.notFound.handleNotFound)
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(e)
    }
  }
}

export const server = Container.get(Init)
server.start()