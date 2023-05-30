import React from 'react'
import ListCard from '../../components/list'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Spin } from 'antd'
import Search from '../../components/search'
import './common.scss'
import { getQuestionListData } from '../../services/question'

const { Title } = Typography

const ListPage = () => {
  useTitle('我的问卷')
  const { data, loading } = useRequest(getQuestionListData)
  const { list = [] } = data || {}
  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className='right'>
          <Search />
        </div>
      </div>
      <div className='main'>
        {loading && (
          <div className='spin'>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((item: any) => {
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
      <div className='footer'>下滑加载更多</div>
    </div>
  )
}
export default ListPage
