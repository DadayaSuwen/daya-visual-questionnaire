import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_PATH } from './router'

const page404 = () => {
  const Navigate = useNavigate()
  return (
    <Result
      status={404}
      title='404'
      subTitle='您访问的页面不存在'
      extra={
        <Button onClick={() => Navigate(HOME_PATH)} type='primary'>
          返回主页
        </Button>
      }
    />
  )
}
export default page404
