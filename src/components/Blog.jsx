import { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible(!visible) }

  return (
    <div className='blog'>
      <div>
        <b>{blog.title}</b> by <i>{blog.author}</i>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>
      {visible && <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleRemove}>remove</button>
      </div>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog