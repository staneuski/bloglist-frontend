import { useDispatch, useSelector } from 'react-redux'

import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import { initialiseBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  const [user, setUser] = useState(null)
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

  const blogs = useSelector((state) => state.blogs).toSorted(
    (lhs, rhs) => rhs.likes - lhs.likes
  )

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
          <BlogForm />
          <div className="blog-list">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                isOwned={blog.user.username === user.username}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
