import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('calls the event handler with correct details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('post blog')

    await user.type(titleInput, 'Testing Blog')
    await user.type(urlInput, 'Testing Url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Testing Blog',
      url: 'Testing Url'
    })
  })
})