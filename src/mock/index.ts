import type { ApiCategory, ApiItem, ApiDetail } from '../types'

export const categories: ApiCategory[] = [
  { id: 'all', name: '全部接口', icon: 'Folder', count: 156 },
  { id: 'ai', name: 'AI 智能', icon: 'Cpu', count: 24 },
  { id: 'data', name: '数据服务', icon: 'DataAnalysis', count: 22 },
  { id: 'dev', name: '开发工具', icon: 'Tools', count: 18 },
  { id: 'life', name: '生活服务', icon: 'HomeFilled', count: 20 },
  { id: 'entertainment', name: '娱乐休闲', icon: 'Film', count: 15 },
  { id: 'image', name: '图片处理', icon: 'Picture', count: 12 },
  { id: 'utils', name: '实用工具', icon: 'Operation', count: 18 },
  { id: 'finance', name: '金融服务', icon: 'Money', count: 7 }
]

export const apiList: ApiItem[] = [
  {
    id: 'ai-chat',
    name: 'AI 对话',
    description: '智能对话聊天，支持上下文连续对话',
    method: 'POST',
    path: '/ai/chat',
    isFree: true,
    views: 12200,
    rating: 4.9,
    score: 4.9,
    icon: 'ChatDotRound',
    category: 'ai'
  },
  {
    id: 'ai-generate',
    name: '文本生成',
    description: '根据提示生成高质量文本内容',
    method: 'POST',
    path: '/ai/generate',
    isFree: true,
    views: 9200,
    rating: 4.8,
    score: 4.8,
    icon: 'EditPen',
    category: 'ai'
  },
  {
    id: 'ai-sentiment',
    name: '情感分析',
    description: '分析文本的情感倾向(正/负/中性)',
    method: 'POST',
    path: '/ai/sentiment',
    isFree: true,
    views: 4500,
    rating: 4.7,
    score: 4.7,
    icon: 'Heart',
    category: 'ai'
  },
  {
    id: 'ai-translate',
    name: '文本翻译',
    description: '支持多种语言互译，快速准确',
    method: 'GET',
    path: '/ai/translate',
    isFree: true,
    views: 4500,
    rating: 4.8,
    score: 4.8,
    icon: 'Reading',
    category: 'ai'
  },
  {
    id: 'weather',
    name: '天气查询',
    description: '获取指定城市的实时天气信息',
    method: 'GET',
    path: '/weather',
    isFree: true,
    views: 15200,
    rating: 4.9,
    score: 4.9,
    icon: 'Sunny',
    category: 'life'
  },
  {
    id: 'ip-location',
    name: 'IP地理位置',
    description: '根据IP地址查询地理位置',
    method: 'GET',
    path: '/ip/location',
    isFree: true,
    views: 9100,
    rating: 4.8,
    score: 4.8,
    icon: 'Location',
    category: 'dev'
  },
  {
    id: 'qrcode',
    name: '二维码生成',
    description: '生成二维码图片，支持自定义内容',
    method: 'GET',
    path: '/qrcode',
    isFree: true,
    views: 11500,
    rating: 4.9,
    score: 4.9,
    icon: 'Grid',
    category: 'utils'
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    description: 'Base64 编码与解码',
    method: 'GET',
    path: '/base64',
    isFree: true,
    views: 9700,
    rating: 4.8,
    score: 4.8,
    icon: 'Lock',
    category: 'dev'
  }
]

export const apiDetail: ApiDetail = {
  id: 'ai-chat',
  name: 'AI 对话',
  description: '智能对话聊天，支持上下文连续对话',
  method: 'POST',
  url: 'https://api.freeapihub.com/ajchat',
  params: [
    { name: 'message', required: true, type: 'string', description: '用户输入的消息内容' },
    { name: 'model', required: false, type: 'string', description: '模型名称，默认：default' },
    { name: 'max_tokens', required: false, type: 'number', description: '最大输出长度，默认：1000' },
    { name: 'temperature', required: false, type: 'number', description: '生成温度，默认：0.7' }
  ],
  requestExample: `{
  "message": "你好，请介绍一下你自己",
  "model": "default",
  "max_tokens": 1000,
  "temperature": 0.7
}`,
  responseExample: `{
  "code": 200,
  "data": {
    "response": "你好！我是一个人工智能助手，很高兴为你服务，有什么我可以帮助你的吗？",
    "usage": {
      "prompt_tokens": 12,
      "completion_tokens": 45,
      "total_tokens": 57
    }
  }
}`
}
