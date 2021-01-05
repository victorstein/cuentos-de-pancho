export type Video = {
  id: string
  name: string
}

export type GoogleItems = {
  items: GoogleAPIResult[]
}

export type GoogleAPIResult = {
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
      default: Thumbnail,
      medium: Thumbnail,
      high: Thumbnail
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: Date
  }
}

export type Thumbnail = {
  url: string
  width: number
  height: number
}

export type SearchVideoParams = {
  keyword?: string
  parts?: string
  maxResults?: number
  order?: 'date' | 'rating' | 'viewCount' | 'relevance' | 'title' | 'videoCount'
}