import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/main-layout'
import ManageLayout from '../layout/manage-layout'
import QuestionLayout from '../layout/question-layout'
import Home from '../home'
import Login from '../login'
import Register from '../register'
import Page404 from '../404'
import ListPage from '../manage/list-page'
import Trash from '../manage/trash'
import Edit from '../question/edit'
import Star from '../manage/star'
import Stat from '../question/stat'

export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const MANAGE_LIST_PATH = '/manage/list'
const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <MainLayout />,
    children: [
      {
        path: HOME_PATH,
        element: <Home />
      },
      {
        path: LOGIN_PATH,
        element: <Login />
      },
      {
        path: REGISTER_PATH,
        element: <Register />
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <ListPage />
          },
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          }
        ]
      }
    ]
  },
  {
    path: '/question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
])
export default router
