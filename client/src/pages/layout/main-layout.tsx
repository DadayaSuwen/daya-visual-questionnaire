import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../../components/logo'
import User from '../../components/user'
import './main-layout.scss'
import useLoadUserData from '../../hooks/use-load-user-data'
const MainLayout = () => {
  const { Header, Content, Footer } = Layout
  const { waitingUserData } = useLoadUserData()

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
        {waitingUserData ? (
          <div className='layou-spin'>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className='layout-footer'>footer</Footer>
    </Layout>
  )
}
export default MainLayout
