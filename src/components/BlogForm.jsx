import { useState, useRef } from 'react'

import PropTypes from 'prop-types'

import Togglable from './Togglable'

const Input = ({ handleInput, type, name, value }) => {
  return (
    <div>
      {name}:
      <input onChange={handleInput} type={type} value={value} name={name} />
    </div>
  )
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const BlogForm = ({ createBlog }) => {
  const self = useRef()

  const EMPTY = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(EMPTY)
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    createBlog(blog)
    setBlog(EMPTY)
    self.current.toggleVisibility()
  }

  const setItem = ({ name, value }) => {
    setBlog({ ...blog, [name]: value })
  }

  return (<Togglable buttonLabel='new blog' ref={self}>
    <h2>create new</h2>
    <form onSubmit={handleCreateBlog}>
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='title'
        value={blog.title}
      />
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='author'
        value={blog.author}
      />
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='url'
        value={blog.url}
      />
      <button className='button blog-form__button-submit' type='submit'>
        create
      </button>
    </form>
  </Togglable>)
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm