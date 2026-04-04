import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'

// 创建axios实例
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 缓存管理
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

// 通用请求函数
export async function request<T>(url: string, options?: any): Promise<T> {
  try {
    // 检查缓存
    const cacheKey = `${url}_${JSON.stringify(options)}`
    const cachedData = cache[cacheKey]
    
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
      return cachedData.data as T
    }

    const response = await axiosInstance({
      url,
      ...options
    })

    const data = response.data
    
    // 检查API响应状态
    if (data.code !== 200) {
      const errorMessage = data.message?.error || data.message || '请求失败'
      throw new Error(errorMessage)
    }

    // 更新缓存
    cache[cacheKey] = {
      data: data.data,
      timestamp: Date.now()
    }

    return data.data as T
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}