import { useState, useEffect } from 'react'
import './styles/notification.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggalge from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
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
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: e.response.data.error, type: 'error' } })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
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
        }
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      setBlogs([...blogs, response])
    } catch (e) {
      console.error('error handling input data', e)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `added like to '${response.title}' by ${response.author}.`,
          type: 'success',
        }
      })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      setBlogs(
        blogs.map((blog) => (blog.id !== blogObject.id ? blog : response))
      )
    } catch (e) {
      console.error('error updating like data', e)
    }
  }

  const deleteBlog = async (id, blogData) => {
    try {
      if (user.name !== blogData.author) {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            message: "Can't delete data that it's not own by the user",
            type: 'error',
          }
        })

        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)

        return
      }

      await blogService.remove(id)

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `'${blogData.title}' by ${blogData.author} was removed from the records.`,
          type: 'success',
        }
      })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (e) {
      console.error('error deleting data', e)
    }
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
        {' '}
        {user.name} logged in.{' '}
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
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
