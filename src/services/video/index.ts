import { Service } from 'typedi'
import Axios, { AxiosInstance } from 'axios'
import config from 'config'
import { Video, GoogleItems, SearchVideoParams } from './types'
import youtubedl, { YtResponse } from 'youtube-dl-exec'

@Service()
export default class VideoProvider {
  axios: AxiosInstance
  googleAPIKey: string | null
  channelId: string | null

  constructor () {
    this.axios = Axios
    this.googleAPIKey = config.GOOGLE_API_KEY
    this.channelId = config.CHANNEL_ID

    if (this.googleAPIKey === null) { throw new Error(`A google API key is required to use this service. Current value: ${String(this.googleAPIKey)}`) }
    if (this.channelId === null) { throw new Error(`A channel ID is required to use this service. Current value: ${String(this.channelId)}`) }
  }

  parseVideoId (results: string): Video[] {
    try {
      const jsonResults: GoogleItems = JSON.parse(results)
      return jsonResults.items.map(item => ({ id: item.id.videoId, name: item.snippet.title }))
    } catch (e) {
      console.error(`There was an error parsing the google results. ${e.message as string}`)
      return []
    }
  }

  async searchVideo ({
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
      throw new Error(`There was an error searching for the video. ${e.message as string}`)
    }
  }

  async getAudioTrack (videoId: string): Promise<YtResponse> {
    try {
      const audioUrl = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
        extractAudio: true,
        getUrl: true
      })

      return audioUrl
    } catch (e) {
      throw new Error(`There was an error getting the audio track. ${e.message as string}`)
    }
  }
}
