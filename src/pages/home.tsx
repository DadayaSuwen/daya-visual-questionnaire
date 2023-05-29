import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from 'antd'
import { MANAGE_LIST_PATH } from './router'
import axios from 'axios'
import './home.scss'
const { Title, Paragraph } = Typography

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('/api/question/14').then(res => {
      console.log(res)
    })
  }, [])
  return (
    <div className='home-container'>
      <div className='info'>
        <Title>问卷系统 | 在线编辑</Title>
        <Paragraph>已累计填写 共计3901份问卷</Paragraph>
        <div>
          <Button type='primary' onClick={() => navigate(MANAGE_LIST_PATH)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home
