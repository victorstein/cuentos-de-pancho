import { VoxaEvent } from "voxa"
import views from "./views/views"

export enum STATES {
  askForStoryState = 'askForStoryState',
  endState = 'endState',
  getStoryNameState = 'getStoryNameState',
  playbackState = 'playbackState',
  storyNotFoundState = 'storyNotFoundState',
  storyFoundState = 'storyFoundState',
  searchingState = 'searchingState',
  shouldPlayStoryState = 'shouldPlayStoryState'
}

export enum INTENTS {
  LaunchIntent = 'LaunchIntent',
  CancelIntent = 'CancelIntent',
  PauseIntent = 'PauseIntent',
  tellAStoryIntent = 'tellAStoryIntent',
  askForStoryIntent = 'askForStoryIntent',
  developerNoteIntent = 'developerNoteIntent',
  helpIntent = 'HelpIntent'
}

export type Intent = {
  name: INTENTS
  handler: (voxaEvent: VoxaEvent) => VoxaTransitionObject | Promise<VoxaTransitionObject>
}

export type State = {
  name: STATES
  handler: (voxaEvent: VoxaEvent) => VoxaTransitionObject | Promise<VoxaTransitionObject>
}

export type Listeners = {
  states: Array<State>
  intents: Array<Intent>
}

enum LANGUAGES {
  en = 'en',
  es = 'es'
}
enum ACTIONS {
  say = 'say',
  reprompt = 'reprompt'
}

export enum FLOWTYPES {
  continue = 'continue',
  yield = 'yield',
  terminate = 'terminate'
}

export type Translation = {
  [y: string]: {
    [key in keyof typeof ACTIONS]?: string
  }
}

export type ViewType = {
  [key in keyof typeof LANGUAGES]?: {
    translation: Translation
  }
}

export type VoxaTransitionObject = {
  flow?: keyof typeof FLOWTYPES
  reply?: keyof typeof views
  to?: keyof typeof STATES
  say?: string
  sayp?: string
  text?: string
  textp?: string
  reprompt?: string
  alexaStopAudio?: boolean
  directives?: any
}