import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
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
      </div>}
    </div>
  )
}

export default Blog