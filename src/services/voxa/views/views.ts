import { translation } from '../types'

const views: translation = {
  welcome: {
    say: "Hola, bienvenido a cuentos de Pancho Madrigal."
  },
  askForStory: {
    say: "¿Que cuento de pancho madrigal te gustaria escuchar?"
  },
  search: {
    say: "Buscando el cuento: {currentStory}."
  },
  storyFoundState: {
    say: "Reproduciendo {currentStory}."
  },
  storyNotFound: {
    say: "No encontre un cuento relacionado a {currentStory}. ¿Te gustaria escuchar un cuento popular de pancho?"
  },
  farewell: {
    say: "Gracias por escuchar los cuentos. Como diría Pancho: Auténtico amigo. Ahi nos vemos Filiberto!"
  },
  error: {
    say: "Hubo un error al inicial la skill. Contactate con el desarrollador."
  }
}

export default views