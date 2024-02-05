import { createSlice } from '@reduxjs/toolkit'

import { setNotification } from './notificationReducer'

import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    }
  }
})

export const { set } = userSlice.actions

export const initialiseUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (!loggedUserJSON) return set(null)

    const user = JSON.parse(loggedUserJSON)
    dispatch(set(user))
    blogService.setToken(user.token)
  }
}

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)

      localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(set(user))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedUser')
    dispatch(set(null))
  }
}

export default userSlice.reducer
