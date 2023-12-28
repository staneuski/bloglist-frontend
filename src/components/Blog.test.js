import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

const blog = {
  title: 'Demo',
  author: 'John',
  url: 'https://example.com'
}

describe('<Blog />', () => {
  test('renders only title and author by default', () => {

    const { container } = render(<Blog blog={blog} />)

    expect(container.querySelector('.blog__title'))
      .toHaveTextContent(blog.title && blog.author)
    expect(container.querySelector('.blog__link'))
      .toBe(null)
  })
})