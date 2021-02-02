import { VoxaEvent } from 'voxa'

const currentStory = (voxaEvent: VoxaEvent): string => {
  return voxaEvent.model.currentStory
}

const variables = {
  currentStory
}

export default variables
