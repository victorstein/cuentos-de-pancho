import express, { json, Application } from 'express'
import config from '../config'
import helmet from 'helmet'
import enforce from 'express-sslify'
import cors, { CorsOptions } from 'cors'
import { Service } from 'typedi'

@Service()
export default class ExpressLoader {
  env: string
  app: Application
  corsOptions: CorsOptions

  constructor () {
    this.env = config.ENV
    this.app = express()
    this.corsOptions = {
      credentials: true,
      origin: config.ENV === 'production' ? config.ALLOWED_ORIGINS : '*'
    }
  }

  start (): Application {
    try {
      this.app.use(json({ limit: '200kb' }))
      
      // Basic security for production
      if (this.env === 'production') {
        this.app.use(helmet())
        this.app.disable('x-powered-by')
        this.app.use(enforce.HTTPS({ trustProtoHeader: true }))
        this.app.use(cors(this.corsOptions))
      }

      console.log('Express Initialized successfully ✅')

      return this.app
    } catch (e) {
      console.log('Error initializing Express: 💥 ->', e.message)
      throw new Error(e)
    }
  }
}