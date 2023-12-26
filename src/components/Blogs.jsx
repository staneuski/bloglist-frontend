const Blog = ({ blog }) => (<div>{blog.title} {blog.author}</div>)

const Blogs = ({ user, blogs }) => (<>
  <h2>blogs</h2>
  <p>{user.name} logged in</p>
  {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
</>)

export default Blogs