const Input = ({ handleInput, type, name, value }) => {
  return (
    <div>
      {name}
      <input onChange={handleInput} type={type} value={value} name={name} />
    </div>
  )
}

const LoginForm = ({
  handleLogin,
  setUsername, username,
  setPassword, password
}) => (<>
  <h2>log in to application</h2>
  <form onSubmit={handleLogin}>
    <Input
      handleInput={({ target }) => setUsername(target.value)}
      type='text'
      name='username'
      value={username}
    />
    <Input
      handleInput={({ target }) => setPassword(target.value)}
      type='text'
      name='password'
      value={password}
    />
    <button type='submit'>login</button>
  </form>
</>)

export default LoginForm