import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs).toSorted(
    (lhs, rhs) => rhs.likes - lhs.likes
  )

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
