import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    show(state, action) {
      return action.payload
    }
  }
})

export const { show } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  console.log(message)
  return (dispatch) => {
    dispatch(show(message))
    setTimeout(() => dispatch(show(null)), 1000 * timeout)
  }
}

export default notificationSlice.reducer
