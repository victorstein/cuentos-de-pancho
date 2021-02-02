const views = {
  welcome: {
    say: 'Hola, bienvenido a cuentos de Pancho Madrigal. Para pedirle a pancho que cuente un cuento puedes decir: Alexa, dile a Pancho Madrigal que me cuente un cuento.'
  },
  askForStory: {
    say: '¿Que cuento de pancho madrigal te gustaria escuchar?'
  },
  search: {
    say: 'Buscando el cuento: {currentStory}.<break time="2s"/>'
  },
  storyFoundState: {
    say: 'Reproduciendo {currentStory}.'
  },
  storyNotFound: {
    say: 'No encontre un cuento relacionado. ¿Te gustaria escuchar un cuento popular de pancho?'
  },
  farewell: {
    say: 'Gracias por escuchar los cuentos. Como diría Pancho: Auténtico amigo. Ahi nos vemos Filiberto!'
  },
  error: {
    say: 'Hubo un error al iniciar la skill. Contáctate con el desarrollador.'
  },
  help: {
    say: 'Para escuchar los cuentos puedes decir: Alexa, dile a Pancho Madrigal que haga lo suyo, o Alexa, dile a Pancho Madrigal que nos cuente un cuento.'
  },
  developerNote: {
    say: 'Nota del desarrollador. Muchas gracias por usar la habilidad de cuentos de Pancho. Esta habilidad fue creada en memoria de dos grandes fanaticos de estas entretenidas historias, y con la unica motivacion de entretenerlos a ustedes tanto como los cuentos de Pancho entretenían a mis queridos abuelos. En paz descansen, Emilio Alfonso Selva Maldonado y Ana del Socorro Melendez Quiroz.'
  }
}

export default views
