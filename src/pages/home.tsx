import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <p>Home</p>
      <div>
        <button onClick={() => navigate('/login')}>登录</button>
        <Link to='/register'>注册</Link>
      </div>
    </div>
  )
}
export default Home
