const Input = ({ handleInput, type, name, value }) => {
  return (
    <div>
      {name}:
      <input onChange={handleInput} type={type} value={value} name={name} />
    </div>
  )
}

const BlogForm = ({ handleCreate, setBlog, blog }) => {
  const setItem = ({ name, value }) => {
    setBlog({...blog, [name]: value})
  }

  return (<>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='title'
        value={blog.title}
      />
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='author'
        value={blog.author}
      />
      <Input
        handleInput={({ target }) => setItem(target)}
        type='text'
        name='url'
        value={blog.url}
      />
      <button type='submit'>create</button>
    </form>
  </>)
}

export default BlogForm