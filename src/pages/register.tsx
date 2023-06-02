import React from 'react'
import { Typography, Form, Input, Space, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATH } from '../pages/router/index'
import { registerService } from '../services/user'
import { useRequest } from 'ahooks'
import './register.scss'

interface IRegister {
  registerUsername: string
  registerPassword: string
}

const { Title } = Typography
const Register = () => {
  const navigate = useNavigate()
  const { loading: registerLoading, run: register } = useRequest(async values => {
    const { registerUsername, registerPassword } = values
    await registerService(registerUsername, registerPassword)

  }, {
    manual: true,
    onSuccess() {
      message.success('注册成功')
      navigate(LOGIN_PATH)
    }
  })
  // 注册事件
  const onFinish = (values: IRegister) => {
    register(values)
  }
  return (
    <div className='register-form'>
      <div>
        <Title>
          <Space>
            <UserAddOutlined />
            <span>注册</span>
          </Space>
        </Title>
      </div>
      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            name='registerUsername'
            label='账号'
            rules={[
              { required: true, message: '请填写账号' },
              { min: 6, message: '账号最少6位' },
              { max: 16, message: '账号最多16位' },
              {
                type: 'string',
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '账号只能由数字、字母、下划线组成'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='registerPassword'
            label='密码'
            rules={[
              { required: true, message: '请填写密码' },
              { min: 6, message: '密码最少6位' },
              { max: 16, message: '密码最多16位' },
              {
                type: 'string',
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '密码只能由数字、字母、下划线组成'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='确认密码'
            dependencies={['registerPassword']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('registerPassword') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject('两次密码不一致')
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type='primary' htmlType='submit' disabled={registerLoading}>
                注册
              </Button>
              <Link to={LOGIN_PATH}>去登陆</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
