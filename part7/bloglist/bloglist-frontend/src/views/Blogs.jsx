import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Toggalge from '../components/Toggable'
import blogService from '../services/blogs'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useSelector, useDispatch } from 'react-redux'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch({ type: 'CLEAR_USER' })
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

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

  const updateBlog = async (id, blogObject) => {
    dispatch(likeBlog(id, blogObject))

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `added like to '${blogObject.title}' by ${blogObject.author}.`,
        type: 'success',
      },
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const removeBlog = (id, blogData) => {
    dispatch(deleteBlog(id))

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `'${blogData.title}' by ${blogData.author} was removed from the records.`,
        type: 'success',
      },
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in.
        <button onClick={() => handleLogout()}>log out</button>
      </p>

      <Toggalge buttonLabel='create new blog'>
        <BlogForm createBlog={createBlog} />
      </Toggalge>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={removeBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default Blogs