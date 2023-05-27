import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATH } from '../.././pages/router'
const User = () => {
  return (
    <>
      <Link to={LOGIN_PATH}>登录</Link>
    </>
  )
}
export default User
