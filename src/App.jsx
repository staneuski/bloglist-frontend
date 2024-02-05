import { useDispatch } from 'react-redux'

import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch() // TODO: initialiseBlogs()
  // }, [dispatch])

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)

      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      setBlogs(blogs.concat({ ...blog, user: user }))
      dispatch(setNotification(`a new blog '${blog.title}' added`, 5))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  const likeBlog = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id)
    const blogObject = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    try {
      const blog = await blogService.update(id, blogObject)
      setNotification('liked', 5)

      setBlogs(blogs.map((b) => (b.id !== id ? b : blog)))
    } catch (exception) {
      console.error(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((b) => b.id === id)
    if (!confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))
      return

    try {
      await blogService.remove(id)

      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (exception) {
      console.error(exception.response.data.error)
      setNotification(exception.response.data.error, 5)
    }
  }

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
            {blogs
              .sort((lhs, rhs) => rhs.likes - lhs.likes)
              .map((blog) => (
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
