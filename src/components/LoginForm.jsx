import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { logIn } from '../reducers/userReducer'

const Input = ({ handleInput, type, name, value }) => {
  return (
    <div>
      {name}
      <input onChange={handleInput} type={type} value={value} name={name} />
    </div>
  )
}
Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const LoginForm = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logIn({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <Input
          handleInput={({ target }) => setUsername(target.value)}
          type="text"
          name="username"
          value={username}
        />
        <Input
          handleInput={({ target }) => setPassword(target.value)}
          type="password"
          name="password"
          value={password}
        />
        <button className="button login-form__button-login" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
