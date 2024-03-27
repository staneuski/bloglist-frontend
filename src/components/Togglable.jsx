import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button
          color="secondary"
          onClick={toggleVisibility}
          size="small"
          variant="contained"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglable_visible">
        {props.children}
        <Button
          color="error"
          onClick={toggleVisibility}
          size="small"
          variant="contained"
        >
          cancel
        </Button>
      </div>
    </>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
