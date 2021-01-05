import { AlexaPlatform, VoxaApp, VoxaEvent } from 'voxa'
import views from './views'
import variables from './variables'
import VoxaStates from './states'
import { Service } from 'typedi'
import { Listeners, ViewType } from './types'
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
    // Add all the listeners
    this.addListeners()
  }

  addListeners () {
    this.state.intents.forEach(({ name, handler }) => this.app.onIntent(name, (voxaEvent: VoxaEvent) => {
      return handler(voxaEvent)
    }))
    this.state.states.forEach(({ name, handler }) => this.app.onState(name, (voxaEvent: VoxaEvent) => {
      return handler(voxaEvent)
    }))
  }

  getAlexaSkill (): AlexaPlatform {
    const skill = new AlexaPlatform(this.app)
    skill.lambda()
    return skill
  }
}