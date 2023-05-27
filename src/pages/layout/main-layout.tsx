import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../../components/logo'
import User from '../../components/user'
import './main-layout.scss'
const MainLayout = () => {
  const { Header, Content, Footer } = Layout
  return (
    <Layout>
      <Header className='layout-herder'>
        <div className='left'>
          <Logo />
        </div>
        <div className='right'>
          <User />
        </div>
      </Header>
      <Content className='layout-container'>
        <Outlet />
      </Content>
      <Footer className='layout-footer'>footer</Footer>
    </Layout>
  )
}
export default MainLayout
