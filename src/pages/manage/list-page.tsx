import React, { useState } from 'react'
import ListCard from '../../components/list'
import { useTitle } from 'ahooks'
import './list-page.scss'
const ListPage = () => {
  useTitle('666')
  const [data] = useState([
    {
      id: 1,
      title: 'name1',
      isPublish: true,
      isStar: true,
      count: 0,
      createdDate: '2021-09-01',
      createdBy: 'John Doe'
    },
    {
      id: 2,
      title: 'name2',
      isPublish: false,
      isStar: false,
      count: 0,
      createdDate: '2021-09-02',
      createdBy: 'Jane Smith'
    },
    {
      id: 3,
      title: 'name3',
      isPublish: true,
      isStar: false,
      count: 0,
      createdDate: '2021-09-03',
      createdBy: 'Bob Johnson'
    }
  ])
  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>我的问卷</div>
        <div className='right'>（搜索）</div>
      </div>
      <div className='main'>
        {/* 问卷列表 */}
        {data.length > 0 &&
          data.map(item => {
            const { id, title, isPublish, isStar, count, createdDate, createdBy } = item
            return (
              <ListCard
                key={id}
                title={title}
                isPublish={isPublish}
                count={count}
                isStar={isStar}
                createdDate={createdDate}
                createdBy={createdBy}
              />
            )
          })}
      </div>
      <div className='footer'>分页</div>
    </div>
  )
}
export default ListPage
