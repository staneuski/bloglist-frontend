import { createContext, useReducer, useContext } from 'react'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload
    default:
      return state
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, 0)

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext)
  return loginAndDispatch[0]
}

export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(LoginContext)
  return loginAndDispatch[1]
}

// dispatch({ type: 'SET', payload: credentials })
// dispatch({ type: 'SET', payload: null })

export default LoginContext
