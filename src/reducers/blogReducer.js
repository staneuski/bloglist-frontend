import { createSlice } from '@reduxjs/toolkit'

import { setNotification } from './notificationReducer'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    update(state, action) {
      const changedBlog = action.payload
      return state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    setAll(state, action) {
      return action.payload
    }
  }
})

export const { create, remove, update, setAll } = blogSlice.actions

export const initialiseBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setAll(blogs))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(create(newBlog))
      dispatch(setNotification(`a new blog '${newBlog.title}' added`, 5))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(remove(blog.id))
      dispatch(setNotification(`blog '${blog.title}' removed`, 5))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      dispatch(update(likedBlog))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export default blogSlice.reducer
