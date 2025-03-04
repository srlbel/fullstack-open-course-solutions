import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import LoadingScreen from './views/LoadingScreen'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Blogs from './views/Blogs'
import Login from './views/Login'
import Users from './views/Users'
import UserDetail from './views/UserDetail'
import BlogDetails from './views/BlogDetails'
import Navbar from './components/Navbar'

const App = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

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
    setLoading(false)
  }, [dispatch])


  if (loading) return <LoadingScreen />

  return (
    <Router>
      <div>
        <Navbar />
        {notification && <Notification />}
        <Routes>
          <Route path='/' element={user ? <Blogs /> : <Navigate replace to='/login' />} />
          <Route path='/blogs/:id' element={user ? <BlogDetails /> : <Navigate replace to='/login' />} />
          <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
          <Route path='/users/:id' element={user ? <UserDetail /> : <Navigate replace to='/login' />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
