import { AlexaPlatform, VoxaApp, VoxaEvent } from 'voxa'
import views from './views'
import variables from './variables'
import VoxaStates from './states'
import { Service } from 'typedi'
import { Listeners, ViewType, State, Intent, Middleware } from './types'
import Model from './model'

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

  parseListeners (stateType: State[] | Intent[], listenerType: 'onState' | 'onIntent', globalMiddleware?: Middleware) {
    stateType.forEach(({ name, handler, middleware }: State | Intent) => {
      this.app[listenerType](name, async (voxaEvent: VoxaEvent) => {
        if (middleware) { await middleware(name, voxaEvent) } else if (globalMiddleware) { await globalMiddleware(name, voxaEvent) }
        return handler(voxaEvent)
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