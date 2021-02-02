export interface Video {
  id: string
  name: string
}

export interface GoogleItems {
  items: GoogleAPIResult[]
}

export interface GoogleAPIResult {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    publishedAt: Date
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: Date
  }
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface SearchVideoParams {
  keyword?: string
  parts?: string
  maxResults?: number
  order?: 'date' | 'rating' | 'viewCount' | 'relevance' | 'title' | 'videoCount'
}
