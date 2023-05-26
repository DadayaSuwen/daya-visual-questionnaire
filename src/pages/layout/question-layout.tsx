import React from 'react'
import { Outlet } from 'react-router-dom'
const QuestionLayout = () => {
  return (
    <div>
      <p>question</p>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
export default QuestionLayout
