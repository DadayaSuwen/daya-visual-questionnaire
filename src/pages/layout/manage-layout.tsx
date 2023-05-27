import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, OrderedListOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'
import './manage-layout.scss'
const ManageLayout = () => {
  const Navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className='container'>
      <div className='left'>
        <Space direction='vertical'>
          <Button icon={<PlusOutlined />} type='primary' size='large'>
            新建问卷
          </Button>
          <Divider />
          <Button
            icon={<OrderedListOutlined />}
            onClick={() => Navigate('/manage/list')}
            type={pathname.startsWith('/manage/list') ? 'primary' : 'default'}
            size='large'
          >
            我的问卷
          </Button>

          <Button
            icon={<StarOutlined />}
            type={pathname.startsWith('/manage/star') ? 'primary' : 'default'}
            onClick={() => Navigate('/manage/star')}
            size='large'
          >
            星标问卷
          </Button>

          <Button
            icon={<DeleteOutlined />}
            onClick={() => Navigate('/manage/trash')}
            type={pathname.startsWith('/manage/trash') ? 'primary' : 'default'}
            size='large'
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
