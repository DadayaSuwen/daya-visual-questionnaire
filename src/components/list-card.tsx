import React from 'react'
import cl from 'classnames'
import './list-card.scss'

interface ListCardProps {
  title: string
  isPublish: boolean
  isStar: boolean
  createdDate: string
  count: number
  createdBy: string
}

export default function ListCard(props: ListCardProps) {
  const { title, isPublish, count, isStar, createdDate } = props
  return (
    <div className='card'>
      <div className='header-top'>
        <div className='left'>
          <span>
            <a href='#'>{title}</a>
          </span>
        </div>
        <div className='right'>
          <span
            className={cl({
              'active': isPublish
            })}
          >
            未发布
          </span>
          <span>答卷:{count}</span>
          <span>{createdDate}</span>
        </div>
      </div>
      <div className='header-bottom'>
        <div className='left'>
          <button>编辑问卷</button>
          <button>数据统计</button>
        </div>
        <div className='right'>
          <button
            className={cl({
              'active': isStar
            })}
          >
            {isStar ? '取消收藏' : '已收藏'}
          </button>
          <button>复制</button>
          <button>删除</button>
        </div>
      </div>
    </div>
  )
}
