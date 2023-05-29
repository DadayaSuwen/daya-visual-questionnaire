import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, OrderedListOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionServer } from '../../services/question'
import { useRequest } from 'ahooks'
import './manage-layout.scss'
const ManageLayout = () => {
  const Navigate = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoding] = useState(false)

  // const handleCreate = async () => {
  //   setLoding(true)
  //   const data = await createQuestionServer()
  //   const { id } = data
  //   if (id) {
  //     Navigate(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoding(false)
  // }
  const { loading, run: handleCrunreate } = useRequest(createQuestionServer, {
    manual: true,
    onSuccess(result) {
      Navigate(`/question/edit/${result.id}`)
      message.success('创建成功')
    }
  })

  return (
    <div className='container'>
      <div className='left'>
        <Space direction='vertical'>
          <Button
            onClick={handleCrunreate}
            icon={<PlusOutlined />}
            type='primary'
            size='large'
            disabled={loading}
          >
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
