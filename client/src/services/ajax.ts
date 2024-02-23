import axios from 'axios'
import { getUserToken } from '../utils/user-token'

const baseURL = 'http://127.0.0.1:7001'
const timeout = 10 * 1000

const instance = axios.create({
  baseURL,
  timeout
})

// request interceptor
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getUserToken()}`
    return config
  },
  error => Promise.reject(error)
)

// response interceptor
instance.interceptors.response.use(
  res => {
    const resData = res.data as ResType
    const { success, data, message } = resData

    if (!success) {
      console.error(message)
      throw new Error(message || '请求失败')
    }

    return data
  },
  error => {
    if (error.response) {
      // 请求已发出，服务器以状态代码响应
      // 超出 2xx 范围
      console.error(`Error response: ${error.response.status}`)
    } else if (error.request) {
      // 已发出请求但未收到回复
      console.error('Error request: No response received')
    } else {
      // 设置请求时发生了一些事情，触发了错误
      console.error('Error', error.message)
    }

    return Promise.reject(error)
  }
)

export default instance

export type ResType = {
  code: number
  success: boolean
  message?: string
  data?: any
}

export type ResDataType = {
  [key: string]: any
}
