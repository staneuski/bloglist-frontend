import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App'

import { LoginContextProvider } from './contexts/LoginContext'
import { NotificationContextProvider } from './contexts/NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </LoginContextProvider>
  </QueryClientProvider>
)
