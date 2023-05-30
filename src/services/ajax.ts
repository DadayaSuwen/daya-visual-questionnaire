import axios from 'axios'

const instance = axios.create({
  timeout: 10 * 1000
})

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
