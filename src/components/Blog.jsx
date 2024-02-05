import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, isOwned, handleLike, handleRemove }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <div className="blog__title">
        <b>{blog.title}</b> <i>{blog.author}</i>
        <button
          className="button blog__button-visibility"
          onClick={toggleVisibility}
        >
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div>
          <a className="link blog__link" href={blog.url}>
            {blog.url}
          </a>
          <div>
            <span className="blog__likes-counter">likes {blog.likes}</span>
            <button
              className="button blog__button-like"
              onClick={() => dispatch(likeBlog(blog))}
            >
              like
            </button>
          </div>
          <div className="blog__username">{blog.user.name}</div>
          {isOwned && (
            <button
              className="button blog__button-remove"
              onClick={() => dispatch(removeBlog(blog))}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isOwned: PropTypes.bool.isRequired
}

export default Blog
