import 'reflect-metadata'
import config from './config'
import notFound from './middlewares/notFound'
import Loaders from 'loaders'
import Container, { Service } from 'typedi'
import { Application, NextFunction, Request, Response } from 'express'
import routes from 'routes'
import ErrorHandler from 'middlewares/errorHandler'

@Service()
class Init {
  constructor(
    private loaders: Loaders,
    private errorHandler: ErrorHandler
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
      routes.forEach((route) => {
        app.use(route.endpointName, route.router)
      })

      // Start listening
      await this.listen(app, config.PORT)

      // Alert that the server is already in place
      console.log(`Server running at http://localhost:${config.PORT} 🚀`)

      // Handle Errors
      app.use((err: ErrorHandler, _: Request, res: Response, __:NextFunction) => this.errorHandler.handleError(err, res))

      // Handle 404
      app.use(notFound)
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const server = Container.get(Init)
server.start()