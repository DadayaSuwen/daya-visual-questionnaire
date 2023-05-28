import React from 'react'
import cl from 'classnames'
import { Button, Space, Tag, Divider, Popconfirm, Modal, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import './index.scss'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarFilled,
  CopyOutlined,
  DeleteOutlined,
  ExceptionOutlined
} from '@ant-design/icons'

export interface ListCardProps {
  id: number
  key: number
  title: string
  isPublish: boolean
  isStar: boolean
  createdDate: string
  count: number
  createdBy: string
}

export default function ListCard(props: ListCardProps) {
  const { title, isPublish, count, isStar, createdDate, id } = props
  const { confirm } = Modal
  const navigate = useNavigate()
  return (
    <div className='card'>
      <div className='header-top'>
        <div className='left'>
          <Link to={isPublish ? `/question/stat/${id}` : `/question/edit/${id}`}>
            <Space>
              {isStar && <StarOutlined className='is-star' />}
              {title}
            </Space>
          </Link>
        </div>
        <div className='right'>
          <Space>
            <span
              className={cl({
                'active': isPublish
              })}
            >
              {isPublish ? <Tag color='processing'>已发布</Tag> : <Tag>未发布 </Tag>}
            </span>
            <span>答卷:{count}</span>
            <span>{createdDate}</span>
          </Space>
        </div>
      </div>
      <Divider />
      <div className='header-bottom'>
        <div className='left'>
          <Space>
            <Button onClick={() => navigate(`/question/edit/${id}`)} icon={<EditOutlined />}>
              编辑问卷
            </Button>
            <Button
              disabled={!isPublish}
              onClick={() => navigate(`/question/Stat/${id}`)}
              icon={<LineChartOutlined />}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className='right'>
          <Space>
            <Button
              icon={isStar ? <StarFilled /> : <StarOutlined />}
              className={cl({
                'active': isStar
              })}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              onConfirm={() => {
                message.success('成功复制')
              }}
              title='确定复制改问卷吗'
              okText='确定'
              cancelText='取消'
            >
              <Button icon={<CopyOutlined />}>复制</Button>
            </Popconfirm>

            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                confirm({
                  title: '是否删除',
                  icon: <ExceptionOutlined />,
                  onOk: () => message.error('成功删除')
                })
              }}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
