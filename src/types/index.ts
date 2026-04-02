export interface ApiCategory {
  id: string
  name: string
  icon: string
  count: number
}

export interface ApiItem {
  id: string
  name: string
  description: string
  method: 'GET' | 'POST'
  path: string
  isFree: boolean
  views: number
  rating: number
  score: number
  icon: string
  category: string
}

export interface ApiParam {
  name: string
  required: boolean
  type: string
  description: string
}

export interface ApiDetail {
  id: string
  name: string
  description: string
  method: 'GET' | 'POST'
  url: string
  params: ApiParam[]
  requestExample: string
  responseExample: string
}
