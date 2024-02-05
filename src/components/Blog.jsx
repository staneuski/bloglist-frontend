import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, isOwned, handleLike, handleRemove }) => {
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
            <button className="button blog__button-like" onClick={handleLike}>
              like
            </button>
          </div>
          <div className="blog__username">{blog.user.name}</div>
          {isOwned && (
            <button
              className="button blog__button-remove"
              onClick={handleRemove}
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
  isOwned: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func
}

export default Blog
