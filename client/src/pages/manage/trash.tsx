import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import ListPages from '../../components/pagination'
import { useRequest } from 'ahooks'
import { ExceptionOutlined, SyncOutlined } from '@ant-design/icons'
import Search from '../../components/search'
import { updateQuestionServer } from '../../services/question'
import { deleteQuestionServer } from '../../services/question'
import useLoadSearch from '../../hooks/use-load-search'
import './common.scss'
const { Title } = Typography

const Trash = () => {
  useTitle('回收站')
  const { data, loading, refresh } = useLoadSearch({ isDeleted: true })
  const [selectId, setSelectId] = useState<string[]>([])
  const { list = [], total } = data || {}
  const antIcon = <SyncOutlined spin />
  const { confirm } = Modal
  const tableColumns = [
    {
      title: '问卷标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublish',
      render: (isPublish: boolean) =>
        isPublish ? <Tag color='green'>已发布</Tag> : <Tag color='red'>未发布 </Tag>
    },
    {
      title: '答卷数量',
      dataIndex: 'count'
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate'
    }
  ]

  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await deleteQuestionServer(selectId),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        setSelectId([])
        refresh()
        message.success('删除成功')
      }
    }
  )

  const { loading: recoverLoading, run: recover } = useRequest(
    async () => {
      for await (const id of selectId) {
        await updateQuestionServer(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        setSelectId([])
        message.success('恢复成功')
        refresh()
      }
    }
  )

  const okdelete = () => {
    confirm({
      title: '是否彻底删除',
      icon: <ExceptionOutlined />,
      content: '删除后无法恢复',
      okText: '删除',
      onOk: () => {
        deleteQuestion()
      }
    })
  }
  // const [selectAny, setSelectAny] = useState<ListCardProps[]>([])
  const TableElement = (
    <>
      <div className='list'>
        <Space className='header'>
          <Button
            type='primary'
            disabled={selectId.length === 0 || recoverLoading}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectId.length === 0 || deleteLoading} onClick={okdelete}>
            完全删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectId(selectedRowKeys as string[])
            // setSelectAny(selectedRows as ListCardProps[])
          }
        }}
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={item => item.id}
      />
    </>
  )

  return (
    <div className='list'>
      <div className='header'>
        <div className='left'>
          <Title level={3}>回收站</Title>
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
        {list.length > 0 && TableElement}
      </div>
      <div className='footer'>
        <ListPages total={total} />
      </div>
    </div>
  )
}
export default Trash
