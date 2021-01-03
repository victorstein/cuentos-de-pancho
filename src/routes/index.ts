import Container from 'typedi'
import Alexa from './alexa'

const alexaRoute = Container.get(Alexa)

export default [
  alexaRoute
]