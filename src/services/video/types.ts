export type Video = {
  id: string
  name: string
}

export type googleItems = {
  items: googleAPIResult[]
}

export type googleAPIResult = {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  },
  snippet: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: thumbnail,
      medium: thumbnail,
      high: thumbnail
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: Date
  }
}

export type thumbnail = {
  url: string
  width: number
  height: number
}

export type searchVideoParams = {
  keyword?: string
  parts?: string
  maxResults?: number
  order?: 'date' | 'rating' | 'viewCount' | 'relevance' | 'title' | 'videoCount'
}