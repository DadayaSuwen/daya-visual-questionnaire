import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin } from 'antd'
// import type { ListCardProps } from '../../components/list'
import { ExceptionOutlined } from '@ant-design/icons'
import Search from '../../components/search'
import useLoadSearch from '../../hooks/useloadsearch'
import './common.scss'
const { Title } = Typography

const Trash = () => {
  useTitle('回收站')
  const { data, loading } = useLoadSearch({ isDeleted: true })
  const { list = [] } = data || {}
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
  const [selectId, setSelectId] = useState<number[]>([])
  const { confirm } = Modal
  // const [selectAny, setSelectAny] = useState<ListCardProps[]>([])
  const TableElement = (
    <>
      <div className='list'>
        <Space className='header'>
          <Button type='primary' disabled={selectId.length === 0}>
            恢复
          </Button>
          <Button
            danger
            disabled={selectId.length === 0}
            onClick={() =>
              confirm({
                title: '是否彻底删除',
                icon: <ExceptionOutlined />,
                content: '删除后无法恢复',
                okText: '删除',
                onOk: () => {
                  console.log(selectId)
                }
              })
            }
          >
            完全删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectId(selectedRowKeys as number[])
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
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description='暂无数据' />}
        {list.length === 0 && <Empty description='暂无数据' />}
        {list.length > 0 && TableElement}
      </div>
      <div className='footer'>分页</div>
    </div>
  )
}
export default Trash
