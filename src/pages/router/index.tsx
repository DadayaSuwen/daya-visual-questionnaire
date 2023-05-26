import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/min-layout'
import ManageLayout from '../layout/manage-layout'
import QuestionLayout from '../layout/question-layout'
import Home from '../home'
import Login from '../login'
import Register from '../register'
import Page404 from '../404'
import ListPage from '../manage/list-page'
import Trash from '../manage/trash'
import Edit from '../question/edit'
import Star from '../question/star'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
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
        path: 'star/:id',
        element: <Star />
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
])
export default router
