import { FLOWTYPES, INTENTS, Listeners } from "services/voxa/types";

const startIntents: Listeners = {
  intents: [
    {
      name: INTENTS.LaunchIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        reply: "welcome"
      })
    },
    {
      name: INTENTS.tellAStoryIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        to: "askForStoryState"
      })
    },
    {
      name: INTENTS.askForStoryIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        to: "getStoryNameState"
      })
    },
    {
      name: INTENTS.developerNoteIntent,
      handler: () => ({
        flow: FLOWTYPES.continue,
        reply: "developerNote"
      })
    },
    {
      name: INTENTS.helpIntent,
      handler: () => ({
        reply: 'help'
      })
    }
  ],
  states: []
}

export default startIntents