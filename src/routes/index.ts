import { Inject, Service } from 'typedi'
import Alexa from './alexa'
import Status from './status'

@Service()
export default class Routes {
  @Inject()
  alexaRoute: Alexa
  @Inject()
  statusRoute: Status

  getRoutes () {
    return Object.values(this)
  }
}