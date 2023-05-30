import React from 'react'
import ListCard from '../../components/list'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
import Search from '../../components/search'
import './common.scss'
import useLoadSearch from '../../hooks/useloadsearch'
const { Title } = Typography
interface Question {
  id: string;
  title: string;
  isPublish: boolean;
  isStar: boolean;
  count: number;
  createdDate: string;
  createdBy: string;
}
const ListPage = () => {
  useTitle('我的问卷')
  const { data, loading } = useLoadSearch()
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
          list.map((item: Question) => {
            const { id, title, isPublish, isStar, count, createdDate, createdBy } = item
            return (
              <div key={id}>
                <ListCard
                  id={id}
                  title={title}
                  isPublish={isPublish}
                  count={count}
                  isStar={isStar}
                  createdDate={createdDate}
                  createdBy={createdBy}
                />
              </div>
            )
          })}
      </div>
      <div className='footer'>下滑加载更多</div>
    </div>
  )
}
export default ListPage
