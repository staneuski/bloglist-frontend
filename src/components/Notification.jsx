import PropTypes from 'prop-types'

const Notification = ({ message }) => {
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

Notification.propTypes = {
  buttonLabel: PropTypes.string
}

export default Notification
