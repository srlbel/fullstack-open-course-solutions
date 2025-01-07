import { useState, useEffect } from 'react'
import './styles/notification.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggalge from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
        username, password
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch (e) {
      setNotification({ message: e.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
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

      setNotification({
        message: `a new blog '${response.title}' by ${response.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlogs([...blogs, response])
    } catch (e) {
      console.error('error handling input data', e)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)

      setNotification({
        message: `added like to '${response.title}' by ${response.author}.`,
        type: 'success'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : response))
    } catch (e) {
      console.error('error updating like data', e)
    }
  }

  const deleteBlog = async (id, blogData) => {
    try {
      const response = await blogService.remove(id)

      setNotification({
        message: `'${blogData.title}' by ${blogData.author} was removed from the records.`,
        type: 'success'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (e) {
      console.error('error deleting data', e)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <Toggalge buttonLabel="log in">
          {notification && <Notification message={notification.message} type={notification.type} />}
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
      {notification && <Notification message={notification.message} type={notification.type} />}
      <p> {user.name} logged in. <button onClick={() => handleLogout()}>log out</button></p>

      <Toggalge buttonLabel='create new blog'>
        <BlogForm createBlog={createBlog} />
      </Toggalge>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
    </div>
  )
}

export default App