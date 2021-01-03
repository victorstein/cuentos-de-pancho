import { AlexaPlatform, VoxaApp } from 'voxa'
import views from './views'
import variables from './variables'
import addListenres from './states'
import { Service } from 'typedi'
import { viewType } from './types'
import Model from './model'

@Service()
export class Voxa {
  app: VoxaApp
  views: viewType
  variables: any

  constructor () {
    this.views = views
    this.variables = variables
    this.app = new VoxaApp({ Model, views, variables })
    this.addListeners()
  }

  addListeners () {
    addListenres(this.app)
  }

  getAlexaSkill (): AlexaPlatform {
    const skill = new AlexaPlatform(this.app)
    skill.lambda()
    return skill
  }
}