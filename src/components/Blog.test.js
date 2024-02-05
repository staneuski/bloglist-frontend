import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Demo',
    author: 'Unknown',
    url: 'https://example.com',
    user: { name: 'John Doe' }
  }
  const mockHandler = jest.fn()

  let container
  beforeEach(() => {
    container = render(
      <Blog blog={blog} isOwned={true} handleLike={mockHandler} />
    ).container
  })

  test('renders only title and author by default', () => {
    expect(container.querySelector('.blog__title')).toHaveTextContent(
      blog.title && blog.author
    )
    expect(container.querySelector('.blog__link')).toBeNull()
    expect(container.querySelector('.blog__username')).toBeNull()
  })

  test('clicking blog__button-visibility renders details', async () => {
    await userEvent
      .setup()
      .click(container.querySelector('.blog__button-visibility'))

    expect(container.querySelector('.blog__link')).toHaveTextContent(blog.url)
    expect(container.querySelector('.blog__username')).toHaveTextContent(
      blog.user.name
    )
  })

  test('clicking blog__button-like twice received twice called props', async () => {
    const user = userEvent.setup()
    await user.click(container.querySelector('.blog__button-visibility'))

    const button = container.querySelector('.blog__button-like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
