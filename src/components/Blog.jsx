import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible(!visible) }

  return (
    <div className='blog'>
      <div className='blog__title'>
        <b>{blog.title}</b> by <i>{blog.author}</i>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible && <div>
        <a className='link blog__link' href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button className='button blog__button-like' onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button className='button blog__button-remove' onClick={handleRemove}>
          remove
        </button>
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func
}

export default Blog