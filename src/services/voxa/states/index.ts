import startIntents from "./start";
import stopIntents from "./stop";
import usageIntents from "./inUse";

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
  ]
}

export default states