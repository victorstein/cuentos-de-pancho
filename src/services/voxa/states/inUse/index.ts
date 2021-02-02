import { FLOWTYPES, Listeners, STATES } from 'services/voxa/types'
import { PlayAudio, VoxaEvent } from 'voxa'
import { v4 as uuidv4 } from 'uuid'
import VideoProvider from 'services/video'

// Initialize a video provider instance
const videoProvider = new VideoProvider()

const usageIntents: Listeners = {
  intents: [],
  states: [
    {
      name: STATES.askForStoryState,
      handler: () => ({
        flow: FLOWTYPES.yield,
        reply: 'askForStory',
        to: STATES.getStoryNameState
      })
    },
    {
      name: STATES.getStoryNameState,
      handler: (voxaEvent: VoxaEvent) => {
        const story = voxaEvent.intent?.params.story ?? ''
        voxaEvent.model.currentStory = story

        return {
          flow: FLOWTYPES.continue,
          reply: 'search',
          to: STATES.searchingState
        }
      }
    },
    {
      name: STATES.searchingState,
      handler: async (voxaEvent: VoxaEvent) => {
        let story = voxaEvent.model.currentStory ?? 'null'

        // Parse story for better results
        story = story.replace(/ /g, '|')

        const videos = await videoProvider.searchVideo({ keyword: story })

        // console.log(videos, story)

        if (videos.length > 0) {
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
      }
    },
    {
      name: STATES.storyFoundState,
      handler: () => ({
        flow: FLOWTYPES.continue,
        reply: 'storyFoundState',
        to: STATES.playbackState
      })
    },
    {
      name: STATES.storyNotFoundState,
      handler: () => ({
        flow: FLOWTYPES.yield,
        reply: 'storyNotFound',
        to: STATES.shouldPlayStoryState
      })
    },
    {
      name: STATES.shouldPlayStoryState,
      handler: async (voxaEvent: VoxaEvent) => {
        if (voxaEvent.intent?.name === 'YesIntent') {
          // Get a random number between 0 and 19
          const videoIndex = Math.floor(Math.random() * 20)
          const videos = await videoProvider.searchVideo({ keyword: '', order: 'rating', maxResults: 20 })

          // Asign video id to model
          voxaEvent.model.currentStoryId = videos[videoIndex].id
          // Asign found story name to model
          voxaEvent.model.currentStory = videos[videoIndex].name

          return {
            flow: FLOWTYPES.continue,
            to: 'storyFoundState'
          }
        }
        return {
          flow: FLOWTYPES.continue,
          to: 'endState'
        }
      }
    },
    {
      name: STATES.playbackState,
      handler: async (voxaEvent: VoxaEvent) => {
        // Create a token for audio player
        const token = uuidv4()
        // Get the audio url
        const videoURL = await videoProvider.getAudioTrack(voxaEvent.model.currentStoryId)

        const playAudio = new PlayAudio({ url: videoURL, token })

        return {
          directives: playAudio
        }
      }
    }
  ]
}

export default usageIntents
