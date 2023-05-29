import React, { useEffect } from 'react'
import { Typography, Form, Input, Space, Button, Checkbox } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATH } from '../pages/router/index'
import './login.scss'

interface ILogin {
  loginUserName: string
  loginPassWord: string
  remenber: boolean
}

const { Title } = Typography
const USERNAME_KEY = 'loginUserName'
const PASSWORD_KEY = 'loginPassWord'

const remenberUser = (userName: string, userPassword: string) => {
  localStorage.setItem(USERNAME_KEY, userName)
  localStorage.setItem(PASSWORD_KEY, userPassword)
}
const deleteremenberUser = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

const getStorage = () => {
  return {
    loginUserName: localStorage.getItem(USERNAME_KEY),
    loginPassWord: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login = () => {
  const onFinish = (values: ILogin) => {
    console.log(values)
    const { loginUserName, loginPassWord, remenber } = values

    if (remenber) {
      remenberUser(loginUserName, loginPassWord)
    } else {
      deleteremenberUser()
    }
  }
  const [form] = Form.useForm()
  useEffect(() => {
    const { loginUserName, loginPassWord } = getStorage()
    form.setFieldsValue({
      loginUserName,
      loginPassWord
    })
  }, [])
  return (
    <div className='login-form'>
      <div>
        <Title>
          <Space>
            <UserOutlined />
            <span>登录</span>
          </Space>
        </Title>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remenber: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='loginUserName'
            label='账号'
            rules={[{ required: true, message: '请填写账号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='loginPassWord'
            label='密码'
            rules={[{ required: true, message: '请填写密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }} name='remenber'>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                登录
              </Button>
              <Link to={REGISTER_PATH}>去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
