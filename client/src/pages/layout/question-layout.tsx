import React from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../../hooks/useloaduserdata'
import './question-layout.scss'
const QuestionLayout = () => {
  const { waitingUserData } = useLoadUserData()
  return (
    <div>
      <p>question</p>
      <div>
        {waitingUserData ? <Spin className='layou-spin' /> : <Outlet />}
      </div>
    </div>
  )
}
export default QuestionLayout
