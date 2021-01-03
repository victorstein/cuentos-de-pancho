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
  PlayRandomIntent = 'PlayRandomIntent',
  CancelIntent = 'CancelIntent',
  PauseIntent = 'PauseIntent'
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

export type translation = {
  [y: string]: {
    [key in keyof typeof ACTIONS]?: string
  }
}

export type viewType = {
  [key in keyof typeof LANGUAGES]?: {
    translation: translation
  }
}

export type voxaTransitionObject = {
  flow: keyof typeof FLOWTYPES
  reply?: keyof typeof views
  to?: keyof typeof STATES
  say?: string
  sayp?: string
  text?: string
  textp?: string
  reprompt?: string
  alexaStopAudio?: boolean
}