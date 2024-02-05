import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglable_visible')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    await userEvent.setup().click(screen.getByText('show...'))

    const div = container.querySelector('.togglable_visible')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('show...'))
    await user.click(screen.getByText('cancel'))

    const div = container.querySelector('.togglable_visible')
    expect(div).toHaveStyle('display: none')
  })
})
