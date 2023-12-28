import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
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
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (!loggedUserJSON)
      return

    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.error(exception.response.data.error)
      notify(exception.response.data.error)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notify(`a new blog '${blog.title}' added`)
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
          <Blogs blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App