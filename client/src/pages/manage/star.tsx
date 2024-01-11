import React from 'react'
import ListCard from '../../components/list'
import { useTitle } from 'ahooks'
import { SyncOutlined } from '@ant-design/icons'
import { Typography, Empty, Spin } from 'antd'
import Search from '../../components/search'
import useLoadSearch from '../../hooks/use-load-search'
import ListPages from '../../components/pagination'
import './common.scss'

const { Title } = Typography
const Star = () => {
  useTitle('我的收藏')

  const { data, loading } = useLoadSearch({ isStar: true })
  const { list = [], total } = data || {}

  const antIcon = <SyncOutlined spin />
  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className='right'>
          <Search />
        </div>
      </div>
      <div className='main'>
        {loading && (
          <div className='spin'>
            <Spin indicator={antIcon} />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description='暂无数据' />}
        {list.length > 0 &&
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
      <div className='footer'>
        <ListPages total={total} />
      </div>
    </div>
  )
}
export default Star
