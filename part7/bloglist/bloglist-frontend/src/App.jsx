import { useState, useEffect } from 'react'
import './styles/notification.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggalge from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch({ type: 'SET_BLOGS', payload: blogs }))
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch({ type: 'SET_USER', payload: { user } })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: e.response.data.error, type: 'error' },
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

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

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <Toggalge buttonLabel='log in'>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Toggalge>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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

export default App
