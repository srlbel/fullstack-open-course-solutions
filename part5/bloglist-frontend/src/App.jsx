import { useState, useEffect } from 'react'
import './styles/notification.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create({ title, url })
      setNotification({ message: `a new blog '${response.title}' by ${response.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs([response, ...blogs])
      setTitle('')
      setUrl('')
    } catch (e) {
      console.error('error handling input data', e)
    }
  }


  if (user === null) {
    return (
      <div>
        {notification && <Notification message={notification.message} type={notification.type} />}
        <h2>log in</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <p> {user.name} logged in. <button onClick={() => handleLogout()}>log out</button></p>
      <BlogForm
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        url={url}
        setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App