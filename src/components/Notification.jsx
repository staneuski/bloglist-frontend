import { useSelector } from 'react-redux'

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
  const modifier = errorTriggers.some((err) => message.includes(err))
    ? 'notification_error'
    : 'notification_success'
  return <div className={'notification ' + modifier}>{message}</div>
}

export default Notification
