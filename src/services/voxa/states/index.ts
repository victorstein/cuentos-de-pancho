import VideoProvider from "services/video";
import { PlayAudio, VoxaApp } from "voxa";
import { FLOWTYPES, INTENTS, STATES, voxaTransitionObject } from '../types'
import { v4 as uuidv4 } from 'uuid';

export default (voxaApp: VoxaApp) => {
  // Initialize a video provider instance
  const videoProvider = new VideoProvider()

  voxaApp.onIntent(INTENTS.LaunchIntent, (): voxaTransitionObject => ({
    flow: FLOWTYPES.continue,
    reply: "welcome",
    to: STATES.askForStoryState
  }));

  voxaApp.onIntent(INTENTS.PlayRandomIntent, (): voxaTransitionObject => ({
    flow: FLOWTYPES.continue,
    to: STATES.askForStoryState
  }));

  voxaApp.onIntent(INTENTS.CancelIntent, (): voxaTransitionObject => ({
    flow: FLOWTYPES.continue,
    to: STATES.endState
  }));

  voxaApp.onIntent(INTENTS.PauseIntent, (): voxaTransitionObject => ({
    flow: FLOWTYPES.continue,
    to: STATES.endState
  }));

  voxaApp.onState(STATES.askForStoryState, (): voxaTransitionObject => ({
    flow: FLOWTYPES.yield,
    reply: "askForStory",
    to: STATES.getStoryNameState
  }))

  voxaApp.onState(STATES.getStoryNameState, (voxaEvent): voxaTransitionObject => {
    const story = voxaEvent.intent.params.story || ''
    voxaEvent.model.currentStory = story
    
    return {
      flow: FLOWTYPES.continue,
      reply: "search",
      to: STATES.searchingState
    }
  })

  voxaApp.onState(STATES.searchingState, async (voxaEvent): Promise<voxaTransitionObject> => {
    let story = voxaEvent.model.currentStory || 'asdfadsfasdfwer234'
    
    // Parse story for better results
    story = story.replace(/ /g, '|')

    const videos = await videoProvider.searchVideo({ keyword: story })
    if (videos.length) {
      // Asign video id to model
      voxaEvent.model.currentStoryId = videos[0].id
      // Asign found story name to model
      voxaEvent.model.currentStory = videos[0].name
      return {
        flow: FLOWTYPES.continue,
        to: STATES.storyFoundState
      }
    }
    return {
      flow: FLOWTYPES.continue,
      to: STATES.storyNotFoundState
    }
  })

  voxaApp.onState(STATES.storyFoundState, (): voxaTransitionObject => ({
    flow: FLOWTYPES.continue,
    reply: "storyFoundState",
    to: STATES.playbackState
  }))

  voxaApp.onState(STATES.storyNotFoundState, (): voxaTransitionObject => ({
    flow: FLOWTYPES.yield,
    reply: "storyNotFound",
    to: STATES.shouldPlayStoryState
  }))

  voxaApp.onState(STATES.shouldPlayStoryState, async (voxaEvent): Promise<voxaTransitionObject> => {
    if (voxaEvent.intent.name === 'YesIntent') {
      // Get a random number between 0 and 19
      const videoIndex = Math.floor(Math.random() * 20);
      const videos = await videoProvider.searchVideo({ keyword: '', order: 'rating', maxResults: 20 })
      
      // Asign video id to model
      voxaEvent.model.currentStoryId = videos[videoIndex].id
      // Asign found story name to model
      voxaEvent.model.currentStory = videos[videoIndex].name

      return {
        flow: FLOWTYPES.continue,
        to: "storyFoundState"
      }
    }
    return {
      flow: FLOWTYPES.continue,
      to: "endState"
    }
  })

  voxaApp.onState(STATES.playbackState, async (voxaEvent) => {
    // Create a token for audio player
    const token = uuidv4()
    // Get the audio url
    const videoURL = await videoProvider.getAudioTrack(voxaEvent.model.currentStoryId)

    const playAudio = new PlayAudio({ url: videoURL, token })

    return {
      directives: playAudio
    }
  })

  voxaApp.onState(STATES.endState, (): voxaTransitionObject => {
    return {
      alexaStopAudio: true,
      flow: FLOWTYPES.terminate,
      reply: "farewell"
    }
  })
}