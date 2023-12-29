import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser')
    if (!loggedUserJSON)
      return

    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)

      localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.error(exception.response.data.error)
      notify(exception.response.data.error)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      setBlogs(blogs.concat({ ...blog, user: user }))
      notify(`a new blog '${blog.title}' added`)
    } catch (exception) {
      console.error(exception.response.data.error)
      notify(exception.response.data.error)
    }
  }

  const likeBlog = async (id) => {
    const blogToUpdate = blogs.find(b => b.id === id)
    const blogObject = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    try {
      const blog = await blogService.update(id, blogObject)

      setBlogs(blogs.map(b => b.id !== id ? b : blog))
    } catch (exception) {
      console.error(exception.response.data.error)
      notify(exception.response.data.error)
    }
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    if (!confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))
      return

    try {
      await blogService.remove(id)

      setBlogs(blogs.filter(b => b.id !== id))
    } catch (exception) {
      console.error(exception.response.data.error)
      notify(exception.response.data.error)
    }
  }

  return (
    <div>
      {!user
        ? <>
          <h2>log in to application</h2>
          <Notification message={errorMessage} />
          <LoginForm logIn={logIn} />
        </>
        : <>
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <BlogForm createBlog={createBlog} />
          <div className='blog-list'>
            {blogs
              .sort((lhs, rhs) => rhs.likes - lhs.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={() => likeBlog(blog.id)}
                  handleRemove={() => removeBlog(blog.id)}
                />
              )
            }
          </div>
        </>
      }
    </div>
  )
}

export default App