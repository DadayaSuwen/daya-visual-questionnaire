import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
  username: string
}
const initialState: User = {
  username: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (state: User, action: PayloadAction<User>) => {
      return action.payload
    },
    logoutReducer: () => initialState
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
