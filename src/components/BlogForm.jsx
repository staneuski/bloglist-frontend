import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, TextField, Typography } from '@mui/material'

import Togglable from './Togglable'

import { createBlog } from '../reducers/blogReducer'

const Input = ({ handleInput, type, name, value }) => {
  return (
    <div>
      <TextField
        onChange={handleInput}
        type={type}
        value={value}
        label={name}
        sx={{ mb: 1 }}
      />
    </div>
  )
}
Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const BlogForm = () => {
  const self = useRef()
  const dispatch = useDispatch()

  const EMPTY = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(EMPTY)
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    dispatch(createBlog(blog))
    setBlog(EMPTY)
    self.current.toggleVisibility()
  }

  const setItem = ({ name, value }) => {
    setBlog({ ...blog, [name]: value })
  }

  return (
    <Togglable buttonLabel="new blog" ref={self}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Create new
      </Typography>
      <form onSubmit={handleCreateBlog}>
        <Input
          handleInput={({ target }) => setItem(target)}
          type="text"
          name="title"
          value={blog.title}
        />
        <Input
          handleInput={({ target }) => setItem(target)}
          type="text"
          name="author"
          value={blog.author}
        />
        <Input
          handleInput={({ target }) => setItem(target)}
          type="text"
          name="url"
          value={blog.url}
        />
        <Button
          className="button blog-form__button-submit"
          variant="contained"
          color="primary"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
