import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const EMPTY_BLOG = { title: '', author: '', url: '' }

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [newBlog, setNewBlog] = useState(EMPTY_BLOG)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception.response.data.error)
      /*setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog(EMPTY_BLOG)
    } catch (exception) {
      console.error(exception.response.data.error)
    }
  }

  return (
    <div>
      {!user
        ? <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername} username={username}
            setPassword={setPassword} password={password}
          />
        : <>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <BlogForm
            handleCreate={handleCreateBlog}
            setBlog={setNewBlog} blog={newBlog}
          />
          <Blogs user={user} blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App