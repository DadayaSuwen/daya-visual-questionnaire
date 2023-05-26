import React from 'react'
import { Outlet } from 'react-router-dom'
import './manage-layout.scss'
const ManageLayout = () => {
  return (
    <div className='container'>
      <div className='left'>menu</div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
