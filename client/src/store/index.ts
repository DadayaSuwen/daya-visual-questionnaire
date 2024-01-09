import { configureStore } from '@reduxjs/toolkit'
import user, { User } from './user'

export type State = {
  user: User
}

export default configureStore({
  reducer: {
    user
  }
})
