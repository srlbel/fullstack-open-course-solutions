import BlogForm from '../components/BlogForm'
import Toggalge from '../components/Toggable'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

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
    <div>
      <h1>blogs</h1>

      <Toggalge buttonLabel='create new blog'>
        <BlogForm createBlog={createBlog} />
      </Toggalge>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <p key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
            >{blog.title} - {blog.author} </Link>
          </p>
        ))}
    </div>
  )
}

export default Blogs