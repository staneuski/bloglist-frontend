const Notification = ({ message }) => {
  if (message === null)
    return null

  const errorTriggers = ['error', 'invalid', 'unauthorized', 'failed']
  const modifier = errorTriggers.some(err => message.includes(err))
    ? 'notification_error'
    : 'notification_success'
  return (
    <div className={'notification ' + modifier}>{message}</div>)
}

export default Notification