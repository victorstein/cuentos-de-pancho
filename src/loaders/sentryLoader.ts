import * as Sentry from '@sentry/node'
import { Service } from 'typedi'
import config from 'config'

@Service()
export default class SentryLoader {
  dsn: string
  serverName: string
  environment: string
  constructor (
    dsn: string = config.SENTRY_DSN,
    serverName: string = config.SENTRY_SERVER_NAME
  ) {
    this.dsn = dsn
    this.serverName = serverName
    this.environment = config.ENV
  }

  start (): void {
    try {
      // Initialize Sentry
      Sentry.init({
        dsn: this.dsn,
        serverName: this.serverName,
        environment: this.environment,
        tracesSampleRate: 1
      })
      console.log('Sentry Initialized successfully ✅')
    } catch (e) {
      console.warn('Error Initializing Sentry: 🚨 ->', e.message)
    }
  }
}
