import React from 'react'
import ListCard from '../components/list-card'
import './list-page.scss'
export default function ListPage() {
  return (
    <>
      <div className='header'>
        <h1>问卷列表</h1>
      </div>
      <div>
        <ListCard />
      </div>
    </>
  )
}
