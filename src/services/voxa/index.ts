import { AlexaPlatform, IVoxaReply, VoxaApp, VoxaEvent } from 'voxa'
import views from './views'
import variables from './variables'
import VoxaStates from './states'
import { Service } from 'typedi'
import { Listeners, ViewType, State, Intent, Middleware } from './types'
import Model from './model'
import * as Sentry from '@sentry/node'

@Service()
export class Voxa {
  app: VoxaApp
  views: ViewType
  variables: any
  state: Listeners

  constructor () {
    this.views = views
    this.variables = variables
    this.state = VoxaStates
    this.app = new VoxaApp({ Model, views, variables })
    this.addListeners()
  }

  parseListeners (stateType: State[] | Intent[], listenerType: 'onState' | 'onIntent', globalMiddleware?: Middleware): void {
    stateType.forEach(({ name, handler, middleware }: State | Intent) => {
      this.app[listenerType](name, async (voxaEvent: VoxaEvent) => {
        try {
          // Run middlewares
          if (middleware !== undefined) {
            await middleware(name, voxaEvent)
          } else if (globalMiddleware !== undefined) {
            await globalMiddleware(name, voxaEvent)
          }

          // Handle the voxa request
          const response = await handler(voxaEvent)

          // Send the response back
          return response
        } catch (e) {
          throw new Error(e)
        }
      })
    })
  }

  addListeners (): void {
    // Add states And Intent Listeners
    this.parseListeners(this.state.intents, 'onIntent', this.state.middleware)
    this.parseListeners(this.state.states, 'onState', this.state.middleware)

    // Set up onError handler
    this.app.onError(async function errorHandler (voxaEvent: VoxaEvent, err: Error, reply: IVoxaReply) {
      try {
        Sentry.captureException(err)
        const statement = await voxaEvent.renderer.renderPath('error.say', voxaEvent)
        reply.clear()
        reply.addStatement(statement, false)
        reply.terminate()
        return reply
      } catch (e) {
        throw new Error(e)
      }
    })
  }

  getAlexaSkill (): AlexaPlatform {
    const skill = new AlexaPlatform(this.app)
    skill.lambda()
    return skill
  }
}
