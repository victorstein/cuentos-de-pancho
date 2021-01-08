import * as Sentry from '@sentry/node'
import { Service } from 'typedi';
import config from 'config';

@Service()
export default class SentryLoader {
  dsn: string
  serverName: string
  constructor (
    dsn: string = config.SENTRY_DSN,
    serverName: string = config.SENTRY_SERVER_NAME
  ) {
    this.dsn = dsn
    this.serverName = serverName
  }

  start ({ force = false }) {
    try {
      // If not in production don't activate Sentry
      if (config.ENV !== 'production' && force === false) {
        console.log('Sentry not initialized environment is not production ⚠️')
        return
      }

      // Initialize Sentry
      Sentry.init({
        dsn: this.dsn,
        serverName: this.serverName
      }) 
      console.log('Sentry Initialized successfully ✅')
    } catch (e) {
      console.warn('Error Initializing Sentry: 🚨 ->', e.message)
    }
  }
}