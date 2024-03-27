import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material'

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
    <Container>
      {!user ? (
        <>
          <Notification />
          <Typography
            // textAlign="center"
            variant="h4"
            component="h1"
            sx={{ mb: 2 }}
          >
            Log in to application
          </Typography>
          <LoginForm />
        </>
      ) : (
        <>
          <Notification />
          <Typography
            // textAlign="center"
            variant="h4"
            component="h1"
            sx={{ mb: 2 }}
          >
            Blogs
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => dispatch(logOut())}
          >
            logout {user.name}
          </Button>
          <BlogForm />
          <BlogList />
        </>
      )}
    </Container>
  )
}

export default App
