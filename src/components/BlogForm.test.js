import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  const blog = {
    title: 'Demo',
    author: 'Unknown',
    url: 'https://example.com'
  }
  const mockHandler = jest.fn()

  let container
  beforeEach(() => {
    container = render(<BlogForm createBlog={mockHandler} />).container
  })

  test('updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    await user.type(container.querySelector('[name="title"]'), blog.title)
    await user.type(container.querySelector('[name="author"]'), blog.author)
    await user.type(container.querySelector('[name="url"]'), blog.url)

    await user.click(container.querySelector('.blog-form__button-submit'))

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(blog)
  })
})
