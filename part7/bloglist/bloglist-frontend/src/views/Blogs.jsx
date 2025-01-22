import BlogForm from '../components/BlogForm'
import Toggalge from '../components/Toggable'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `a new blog '${response.title}' by ${response.author} added`,
          type: 'success',
        },
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      dispatch({ type: 'ADD_BLOG', payload: response })
    } catch (e) {
      console.error('error handling input data', e)
    }
  }

  return (
    <div className='p-5 flex flex-col space-y-2'>
      <Toggalge buttonLabel='create new blog'>
        <BlogForm createBlog={createBlog} />
      </Toggalge>

      <h1 className='text-2xl font-semibold'>blogs</h1>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className='btn justify-start text-left p-auto'
          >
            <p>{blog.title} by {blog.author}</p>
          </Link>
        ))}
    </div>
  )
}

export default Blogs