import React from 'react'
import cl from 'classnames'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined
} from '@ant-design/icons'

interface ListCardProps {
  key: number
  title: string
  isPublish: boolean
  isStar: boolean
  createdDate: string
  count: number
  createdBy: string
}

export default function ListCard(props: ListCardProps) {
  const { title, isPublish, count, isStar, createdDate, key } = props
  const navigate = useNavigate()
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
          <Space>
            <Button onClick={() => navigate(`/question/edit/${key}`)} icon={<EditOutlined />}>
              编辑问卷
            </Button>
            <Button
              disabled={!isPublish}
              onClick={() => navigate(`/question/Stat/${key}`)}
              icon={<LineChartOutlined />}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className='right'>
          <Space>
            {' '}
            <Button
              icon={isStar ? <StarFilled /> : <StarOutlined />}
              className={cl({
                'active': isStar
              })}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Button icon={<CopyOutlined />}>复制</Button>
            <Button icon={<DeleteOutlined />}>删除</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
