import { VoxaEvent } from 'voxa'
import views from './views/views'

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
  storyIntent = 'storyIntent',
  helpIntent = 'HelpIntent'
}

export type Middleware = (intent: INTENTS | STATES, voxaEvent: VoxaEvent) => void | Promise<void>

export interface Intent {
  name: INTENTS
  handler: (voxaEvent: VoxaEvent) => VoxaTransitionObject | Promise<VoxaTransitionObject>
  middleware?: Middleware
}

export interface State {
  name: STATES
  handler: (voxaEvent: VoxaEvent) => VoxaTransitionObject | Promise<VoxaTransitionObject>
  middleware?: Middleware
}

export interface Listeners {
  states: State[]
  intents: Intent[]
  middleware?: Middleware
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

export interface Translation {
  [y: string]: {
    [key in keyof typeof ACTIONS]?: string | string[]
  }
}

export type ViewType = {
  [key in keyof typeof LANGUAGES]?: {
    translation: Translation
  }
}

export interface VoxaTransitionObject {
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

export interface AlexaRequest {
  version: string
  session: Session
  context: Context
  request: Request
}

export interface Context {
  Viewports: ViewportElement[]
  AudioPlayer: AudioPlayer
  Viewport: PurpleViewport
  Extensions: Extensions
  System: System
}

export interface AudioPlayer {
  playerActivity: string
}

export interface Extensions {
  available: Available
}

export interface Available {
  'aplext:backstack:10': {}
}

export interface System {
  application: Application
  user: User
  device: Device
  apiEndpoint: string
  apiAccessToken: string
}

export interface Application {
  applicationId: string
}

export interface Device {
  deviceId: string
  supportedInterfaces: SupportedInterfaces
}

export interface SupportedInterfaces {
  AudioPlayer: {}
}

export interface User {
  userId: string
  permissions: Permissions
}

export interface Permissions {
  consentToken: string
}

export interface PurpleViewport {
  experiences: Experience[]
  mode: string
  shape: string
  pixelWidth: number
  pixelHeight: number
  dpi: number
  currentPixelWidth: number
  currentPixelHeight: number
  touch: string[]
  video: Video
}

export interface Experience {
  arcMinuteWidth: number
  arcMinuteHeight: number
  canRotate: boolean
  canResize: boolean
}

export interface Video {
  codecs: string[]
}

export interface ViewportElement {
  type: string
  id: string
  shape: string
  dpi: number
  presentationType: string
  canRotate: boolean
  configuration: Configuration
}

export interface Configuration {
  current: Current
}

export interface Current {
  mode: string
  video: Video
  size: Size
}

export interface Size {
  type: string
  pixelWidth: number
  pixelHeight: number
}

export interface Request {
  type: string
  requestId: string
  locale: string
  timestamp: Date
  intent: {
    name: string
    confirmationStatus: string
  }
}

export interface Session {
  new: boolean
  sessionId: string
  application: Application
  user: User
}
