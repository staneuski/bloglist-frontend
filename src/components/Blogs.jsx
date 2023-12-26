import Button from './Button'

const Blog = ({ blog }) => (<div>{blog.title} {blog.author}</div>)

const Blogs = ({ handleLogout, user, blogs }) => (<>
  <h2>blogs</h2>
  <p>
    {user.name} logged in
    <Button handleClick={handleLogout} body='logout' />
  </p>
  {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
</>)

export default Blogs