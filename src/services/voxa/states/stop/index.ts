import { FLOWTYPES, INTENTS, STATES, Listeners } from "services/voxa/types";

const stopIntents: Listeners = {
  intents: [
    {
      name: INTENTS.CancelIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        to: STATES.endState
      })
    },
    {
      name: INTENTS.PauseIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        to: STATES.endState
      })
    }
  ],
  states: [
    {
      name: STATES.endState,
      handler: () => ({
        alexaStopAudio: true,
        flow: FLOWTYPES.terminate,
        reply: "farewell"
      })
    }
  ]
}

export default stopIntents