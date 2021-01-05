import startIntents from "./startIntents";
import stopIntents from "./stopIntents";
import usageIntents from "./usageIntents";

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