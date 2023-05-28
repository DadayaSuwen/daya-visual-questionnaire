import React, { useState } from 'react'
import ListCard from '../../components/list'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import './common.scss'
const { Title } = Typography
const Star = () => {
  useTitle('我的收藏')
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
      isStar: true,
      count: 0,
      createdDate: '2021-09-02',
      createdBy: 'Jane Smith'
    }
  ])
  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className='right'>（搜索）</div>
      </div>
      <div className='main'>
        {data.length === 0 && <Empty description='暂无数据' />}
        {data.length > 0 &&
          data.map(item => {
            const { id, title, isPublish, isStar, count, createdDate, createdBy } = item
            return (
              <ListCard
                id={id}
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
export default Star
