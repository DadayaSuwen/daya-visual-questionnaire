import React from 'react'
import { Outlet } from 'react-router-dom'
import './manage-layout.scss'
const ManageLayout = () => {
  return (
    <div className='container'>
      <div className='left'>
        <div>
          <a href='#'>我的问卷</a>
        </div>
        <div>
          <a href='#'>星标问卷</a>
        </div>
        <div>
          <a href='#'>回收站</a>
        </div>
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
