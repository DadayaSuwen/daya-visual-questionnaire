import React, { useEffect } from 'react'
import { Typography, Form, Input, Space, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_PATH, MANAGE_LIST_PATH } from '../pages/router/index'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { setUserToken } from '../utils/user-token'
import { useDispatch } from 'react-redux';  
import { loginReducer} from '../store/user'
import './login.scss'

interface ILogin {
  loginUserName: string
  loginPassWord: string
  remember: boolean
}

const Login = () => {
  const { Title } = Typography
  const USERNAME_KEY = 'loginUserName'
  const PASSWORD_KEY = 'loginPassWord'
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading: loginLoading, run: login } = useRequest(
    async values => {
      const { loginUserName, loginPassWord } = values
      return await loginService(loginUserName, loginPassWord)
    },
    {
      manual: true,
      onSuccess(result) {
        const { token, username } = result
        setUserToken(token)
        dispatch(loginReducer({
          username
        }))
        navigate(MANAGE_LIST_PATH);
      },
      onError(error) {
        const { message: msg } = error
        message.error(msg)
      }
    }
  )

  const rememberUser = (userName: string, userPassword: string) => {
    localStorage.setItem(USERNAME_KEY, userName)
    localStorage.setItem(PASSWORD_KEY, userPassword)
  }
  const deleteRememberUser = () => {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }

  const getStorage = () => {
    return {
      loginUserName: localStorage.getItem(USERNAME_KEY),
      loginPassWord: localStorage.getItem(PASSWORD_KEY)
    }
  }
  const onFinish = (values: ILogin) => {
    const { loginUserName, loginPassWord, remember: remember } = values

    if (remember) {
      rememberUser(loginUserName, loginPassWord)
    } else {
      deleteRememberUser()
    }
    login(values)
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
              <Button type='primary' htmlType='submit' disabled={loginLoading}>
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
