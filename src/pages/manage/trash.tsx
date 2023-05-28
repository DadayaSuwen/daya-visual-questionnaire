import React, { useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd'
// import type { ListCardProps } from '../../components/list'
import { ExceptionOutlined } from '@ant-design/icons'
import Search from '../../components/search'
import './common.scss'
const { Title } = Typography

const Trash = () => {
  useTitle('回收站')
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
  const tableColumns = [
    {
      title: '问卷标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublish',
      render: (isPublish: boolean) =>
        isPublish ? <Tag color='processing'>已发布</Tag> : <Tag>未发布 </Tag>
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
        dataSource={data}
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
        {data.length === 0 && <Empty description='暂无数据' />}
        {data.length > 0 && TableElement}
      </div>
      <div className='footer'>分页</div>
    </div>
  )
}
export default Trash
