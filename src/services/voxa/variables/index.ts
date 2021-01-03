import { VoxaEvent } from "voxa";

const currentStory = async (voxaEvent: VoxaEvent) => {
  return voxaEvent.model.currentStory
}

const variables = {
  currentStory
}

export default variables