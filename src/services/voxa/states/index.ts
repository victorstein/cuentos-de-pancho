import startIntents from "./start";
import stopIntents from "./stop";
import usageIntents from "./inUse";
import { Middleware } from '../types'

const globalMiddleware: Middleware = () => {
  // console.log(intent)
}

const states = {
  intents: [
    ...startIntents.intents,
    ...stopIntents.intents,
    ...usageIntents.intents
  ],
  states: [
    ...startIntents.states,
    ...stopIntents.states,
    ...usageIntents.states
  ],
  middleware: globalMiddleware
}

export default states