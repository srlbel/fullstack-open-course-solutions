import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Blog Test',
      author: 'Author Test',
      likes: 10,
      url: 'http://url.com'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Blog Test - Author Test')
    expect(element).toBeDefined()

    const url = screen.queryByText('http://url.com')
    const likes = screen.queryByText('likes 10')
    expect(url.parentElement).toHaveStyle('display: none')
    expect(likes.parentElement).toHaveStyle('display: none')
  })

  test('url and likes are shown when button is clicked', async () => {
    const blog = {
      title: 'Blog Test',
      author: 'Author Test',
      likes: 10,
      url: 'http://url.com'
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('http://url.com')
    const likes = screen.getByText('likes 10')
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(url.parentElement).toHaveStyle('display: block')
    expect(likes.parentElement).toHaveStyle('display: block')
  })

  test('calls the event handler twice when button is clicked twice', async () => {
    const blog = {
      title: 'Blog Test',
      author: 'Author Test',
      likes: 10,
      url: 'http://url.com'
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockHandler} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})