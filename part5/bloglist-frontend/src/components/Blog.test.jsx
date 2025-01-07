import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Blog Test',
      author: 'Author Test',
      likes: 10,
      url: 'http://url.com'
    }

    render(<Blog blog={blog} />)
    screen.debug()

    const element = screen.getByText('Blog Test - Author Test')
    expect(element).toBeDefined()

    // FIX: Url & Likes are being captured even when they're not displayed
    const url = screen.queryByText('http://url.com')
    const likes = screen.queryByText('likes 10')
    expect(url.parentElement).toHaveStyle('display: none')
    expect(likes.parentElement).toHaveStyle('display: none')
  })

})