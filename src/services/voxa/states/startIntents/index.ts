import { FLOWTYPES, INTENTS, Listeners, STATES } from "services/voxa/types";

const startIntents: Listeners = {
  intents: [
    {
      name: INTENTS.LaunchIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        reply: "welcome",
        to: STATES.askForStoryState
      })
    }
  ],
  states: [
    {
      name: STATES.playRandomState,
      handler: () => ({
        flow: FLOWTYPES.continue,
        to: STATES.askForStoryState
      })
    }
  ]
}

export default startIntents