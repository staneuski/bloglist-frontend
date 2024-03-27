import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (message === null) return null

  const errorTriggers = [
    'error',
    'failed',
    'invalid',
    'malformatted',
    'unauthorized'
  ]
  const isError = errorTriggers.some((err) => message.includes(err))
  const modifier = isError ? 'notification_error' : 'notification_success'
  const severity = isError ? 'error' : 'success'
  return (
    <Alert className={'notification ' + modifier} severity={severity}>
      {message}
    </Alert>
  )
}

export default Notification
