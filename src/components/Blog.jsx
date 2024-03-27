import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const isOwned =
    useSelector((state) => state.user).username === blog.user.username

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <div className="blog__title">
        <b>{blog.title}</b> <i>{blog.author}</i>
        <Button
          className="button blog__button-visibility"
          color="success"
          onClick={toggleVisibility}
          size="small"
          variant="outlined"
          startIcon={visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        >
          {visible ? 'hide' : 'show'}
        </Button>
      </div>
      {visible && (
        <div>
          <a className="link blog__link" href={blog.url}>
            {blog.url}
          </a>
          <div>
            <span className="blog__likes-counter">likes {blog.likes}</span>
            <Button
              className="button blog__button-like"
              color="secondary"
              onClick={() => dispatch(likeBlog(blog))}
              size="small"
              variant="outlined"
            >
              like
            </Button>
          </div>
          <div className="blog__username">{blog.user.name}</div>
          {isOwned && (
            <Button
              className="button blog__button-remove"
              color="error"
              onClick={() => dispatch(removeBlog(blog))}
              size="small"
              startIcon={<DeleteIcon />}
              variant="outlined"
            >
              remove
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
Blog.propTypes = { blog: PropTypes.object.isRequired }

export default Blog
