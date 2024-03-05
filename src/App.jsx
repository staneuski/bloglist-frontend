import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import { useLoginDispatch, useLoginValue } from './contexts/LoginContext'
import {
  useNotificationDispatch,
  setNotification
} from './contexts/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const loginDispatch = useLoginDispatch()
  const ntfnDispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)
    loginDispatch({ type: 'USER', payload: user })
    blogService.setToken(user.token)
  }, [loginDispatch])

  const handleLogout = (event) => {
    event.preventDefault()

    localStorage.removeItem('loggedUser')
    loginDispatch({ type: 'USER', payload: null })
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)

      localStorage.setItem('loggedUser', JSON.stringify(user))
      loginDispatch({ type: 'USER', payload: user })
    } catch (exception) {
      console.error(exception.response.data.error)
      setNotification(ntfnDispatch, exception.response.data.error, 5)
    }
  }

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogObject) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData(
        { queryKey: ['blogs'] },
        blogs.concat(blogObject)
      )
    }
  })

  const createBlog = (blogObject) => {
    createBlogMutation.mutate(blogObject)
    setNotification(ntfnDispatch, `a new blog '${blogObject.title}' added`, 5)
  }

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const likeBlog = (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id)
    likeBlogMutation.mutate({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const removeBlog = (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    if (!confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))
      return

    removeBlogMutation.mutate(id)
  }

  const user = useLoginValue()
  console.log(user)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data.toSorted((lhs, rhs) => rhs.likes - lhs.likes)

  return (
    <div>
      {!user ? (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm logIn={logIn} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <BlogForm createBlog={createBlog} />
          <div className="blog-list">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                isOwned={blog.user.username === user.username}
                handleLike={() => likeBlog(blog.id)}
                handleRemove={() => removeBlog(blog.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
