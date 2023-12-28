import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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
      <Blog blog={blog} handleLike={mockHandler} />
    ).container
  })

  test('renders only title and author by default', () => {
    expect(container.querySelector('.blog__title'))
      .toHaveTextContent(blog.title && blog.author)
    expect(container.querySelector('.blog__link')).toBe(null)
    expect(container.querySelector('.blog__username')).toBe(null)
  })

  test('clicking blog__button-visibility renders details', async () => {
    await userEvent
      .setup()
      .click(container.querySelector('.blog__button-visibility'))

    expect(container.querySelector('.blog__link'))
      .toHaveTextContent(blog.url)
    expect(container.querySelector('.blog__username'))
      .toHaveTextContent(blog.user.name)
  })
})