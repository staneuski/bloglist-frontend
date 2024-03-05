import { useBlogValue } from '../reducers/BlogContext'

import Blog from './Blog'

const BlogList = (blogs) => {
  // const blogs = useBlogValue.toSorted((lhs, rhs) => rhs.likes - lhs.likes)
  // console.log(blogs)

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
