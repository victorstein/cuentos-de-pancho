import { AlexaPlatform, VoxaApp, VoxaEvent } from 'voxa'
import views from './views'
import variables from './variables'
import VoxaStates from './states'
import { Service } from 'typedi'
import { Listeners, ViewType, State, Intent, Middleware } from './types'
import Model from './model'
import { Transaction } from '@sentry/tracing'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'

@Service()
export class Voxa {
  app: VoxaApp
  views: ViewType
  variables: any
  state: Listeners
  transaction: Transaction | void

  constructor () {
    this.views = views
    this.variables = variables
    this.state = VoxaStates
    this.app = new VoxaApp({ Model, views, variables })
    this.addListeners()
  }

  parseListeners (stateType: State[] | Intent[], listenerType: 'onState' | 'onIntent', globalMiddleware?: Middleware) {
    stateType.forEach(({ name, handler, middleware }: State | Intent) => {
      this.app[listenerType](name, async (voxaEvent: VoxaEvent) => {
        try {
          // Create a transaction
          this.transaction = Sentry.startTransaction({ name, data: voxaEvent }) as Transaction

          // Run middlewares
          if (middleware) { this.transaction = await middleware(name, voxaEvent) }
          else if (globalMiddleware) { this.transaction = await globalMiddleware(name, voxaEvent) }

          // Handle the voxa request
          const response = await handler(voxaEvent)

          // Finish the transaction
          if (this.transaction) this.transaction.finish()
          
          //Send the response back
          return response
        } catch (e) {
          if (this.transaction) this.transaction.finish()
          throw new Error(e)
        }
      })
    })
  }

  addListeners () {
    // Add states And Intent Listeners
    this.parseListeners(this.state.intents, 'onIntent', this.state.middleware)
    this.parseListeners(this.state.states, 'onState', this.state.middleware)
  }

  getAlexaSkill (): AlexaPlatform {
    const skill = new AlexaPlatform(this.app)
    skill.lambda()
    return skill
  }
}