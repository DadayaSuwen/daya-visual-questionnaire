import React, { useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetInfo from '../../hooks/usegetinfo'
import './index.scss'
import { HOME_PATH, MANAGE_LIST_PATH } from '../../pages/router/index'

const { Title } = Typography

const Logo = () => {
  const { username } = useGetInfo()

  const [pathname, setPathname] = useState(HOME_PATH)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_LIST_PATH)
    }
  })
  return (
    <div className='logo-container'>
      <Link to={pathname}>
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
