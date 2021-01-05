import { Service } from "typedi"
import Axios, { AxiosInstance } from 'axios'
import config from "config"
import { Video, GoogleItems, SearchVideoParams } from './types'

@Service()
export default class VideoProvider {
  axios: AxiosInstance
  googleAPIKey: string | null
  channelId: string | null

  constructor () {
    this.axios = Axios
    this.googleAPIKey = config.GOOGLE_API_KEY
    this.channelId = config.CHANNEL_ID

    if (!this.googleAPIKey) { throw new Error(`A google API key is required to use this service. Current value: ${this.googleAPIKey}`) }
    if (!this.channelId) { throw new Error(`A channel ID is required to use this service. Current value: ${this.channelId}`) }
  }

  parseVideoId (results: string): Video[] {
    try {
      const jsonResults: GoogleItems = JSON.parse(results)
      return jsonResults.items.map(item => ({ id: item.id.videoId, name: item.snippet.title }))
    } catch (e) {
      console.error(`There was an error parsing the google results. ${e.message}`)
      return []
    }
  }

  parseAudioTrack (str: string): any {
    // Turn URI into JSON Object
    const parsedData = str.split('&').reduce((params: any, param: any) => {
      const paramSplit = param
        .split('=')
        .map((value: any) => decodeURIComponent(value.replace('+', ' ')))
  
      params[paramSplit[0]] = paramSplit[1]
      return params
    }, {})

    return parsedData
  }

  async searchVideo({
    keyword = '',
    parts = 'id,snippet',
    maxResults = 3,
    order = 'relevance'
  }: SearchVideoParams = {}): Promise<Video[]> {
    try {
      const { data } = await this.axios.get('https://youtube.googleapis.com/youtube/v3/search', {
        params: {
          part: parts,
          channelId: this.channelId,
          maxResults,
          order,
          q: keyword,
          key: this.googleAPIKey,
          type: 'video',
          safeSearch: 'none'
        },
        transformResponse: [(data) => {
          return this.parseVideoId(data)
        }]
      })
  
      return data
    } catch (e) {
      throw new Error(`There was an error searching for the video. ${e.message}`)
    }
  }

  async getAudioTrack (videoId: string): Promise<string> {
    try {
      const { data: ytData } = await this.axios.get('https://www.youtube.com/get_video_info', {
        params: { video_id: videoId },
        transformResponse: [(data) => {
          return this.parseAudioTrack(data)
        }]
      })
  
      var getAdaptiveFormats = JSON.parse(ytData.player_response).streamingData.adaptiveFormats
      var findAudioInfo = getAdaptiveFormats.findIndex((obj: any) => obj.audioQuality)
  
      // get the URL for the audio file
      var audioURL = getAdaptiveFormats[findAudioInfo].url
      return audioURL
    } catch (e) {
      throw new Error(`There was an error getting the audio track. ${e.message}`)
    }
  }
}
