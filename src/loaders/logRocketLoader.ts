import config from '../config'
import LogRocket from 'logrocket'
import { Service } from 'typedi'

@Service()
export default class LogRocketLoader {
  appId: string | null
  logger: any

  constructor () {
    this.appId = config.LOG_ROCKET_APP_ID
    this.logger = LogRocket
    if (!this.appId) console.warn('LogRocket will fail to initialize without an appId')
  }

  start () {
    try {
      this.logger.init(this.appId!);
    } catch (e) {
      console.log('Error initializing LogRocket: 💥 ->', e.message)
    }
  }
}