import React, { useState } from 'react'
import cl from 'classnames'
import { Button, Space, Tag, Divider, Popconfirm, Modal, message } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import './index.scss'
import { updateQuestionServer } from '../../services/question'
import { duplicateQuestionServer } from '../../services/question'
import { useRequest } from 'ahooks'
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
  id: string
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

  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: chanageStarLoading, run: updateQuestion } = useRequest(async () => {
    const data = await updateQuestionServer(id, { isStar: !isStarState })
    return data
  }, {
    manual: true,
    onSuccess() {
      setIsStarState(!isStarState)
      message.success('修改成功')
    }
  })

  const { loading: duplicateLoading, run: duplicate } = useRequest(async () => await duplicateQuestionServer(id), {
    manual: true,
    onSuccess(result) {
      message.success('复制成功')
      navigate(`/question/edit/${result?.id}`)
    }
  })
  const [deleteState, setDeleteState] = useState(false)
  const { loading: deleteLoading, run: isDelete } = useRequest(async () => await updateQuestionServer(id, { isDelete: true }), {
    manual: true,
    onSuccess() {
      message.success('删除成功')
      setDeleteState(true)
    }
  })

  const deleteList = () => {
    confirm({
      title: '是否删除',
      icon: <ExceptionOutlined />,
      onOk: () => isDelete()
    })
  }

  if (deleteState) return null

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
              {isPublish ? <Tag color='green'>已发布</Tag> : <Tag color='red'>未发布 </Tag>}
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
              icon={isStarState ? <StarFilled className={cl({
                'active': isStarState
              })} /> : <StarOutlined />}

              onClick={updateQuestion}
              disabled={chanageStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              onConfirm={duplicate}
              title='确定复制改问卷吗'
              okText='确定'
              cancelText='取消'
            >
              <Button disabled={duplicateLoading} icon={<CopyOutlined />}>复制</Button>
            </Popconfirm>

            <Button
              icon={<DeleteOutlined />}
              onClick={deleteList}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
