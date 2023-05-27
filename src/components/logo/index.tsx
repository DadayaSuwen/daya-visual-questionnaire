import React from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'

const { Title } = Typography

const Logo = () => {
  return (
    <div className='logo-container'>
      <Link to='/'>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷系统</Title>
        </Space>
      </Link>
    </div>
  )
}
export default Logo
