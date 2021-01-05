import { Inject, Service } from 'typedi'
import Alexa from './alexa'
import Status from './status'

@Service()
export default class Route {
  @Inject()
  alexaRoute: Alexa
  @Inject()
  statusRoute: Status

  getRoutes () {
    return Object.values(this)
  }
}