import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUser, logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialiseUser())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  return (
    <div>
      {!user ? (
        <>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          {user.name} logged in
          <button onClick={() => dispatch(logOut())}>logout</button>
          <BlogForm />
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
