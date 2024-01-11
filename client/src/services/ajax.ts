import axios from 'axios'
import { getUserToken } from '../utils/user-token'
const instance = axios.create({
  timeout: 10 * 1000
})

// request拦截器
instance.interceptors.request.use(
  config => {
    if (config.url && config.url.startsWith('/api')) {
      config.baseURL = 'http://127.0.0.1:7001'
    }
    config.headers['Authorization'] = `Bearer ${getUserToken()}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno !== 0) {
    if (msg) console.error(msg)

    throw new Error(msg || '请求失败')
  }

  return data
})

export default instance

export type ResType = {
  errno: number
  msg?: string
  data?: any
}

export type ResDataType = {
  [key: string]: any
}
