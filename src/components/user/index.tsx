import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATH } from '../.././pages/router'
import { removeUserToken } from '../../utils/user-token'
import { Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { getUserInfoService } from '../../services/user'
import './index.scss'

const User = () => {
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  const navigate = useNavigate()
  const UserInfo = (
    <>
      <span className='logout'>
        <UserOutlined />
        昵称：{nickname}
      </span>
      <Button type='link' onClick={() => {
        removeUserToken()
        message.success(username)
        navigate(LOGIN_PATH)
      }}>登出</Button>
    </>
  )
  const Login = (
    <Link to={LOGIN_PATH}>
      <UserOutlined />
      登录
    </Link>
  )
  return (
    <>
      {username ? UserInfo : Login}
    </>
  )
}
export default User
