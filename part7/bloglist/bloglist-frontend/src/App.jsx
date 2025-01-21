import { useEffect } from 'react'
import './styles/notification.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Blogs from './views/Blogs'
import Login from './views/Login'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  console.log(user)

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
  }, [dispatch])

  return (
    <Router>
      <div>
        {notification && <Notification />}
        <Routes>
          <Route path='/' element={user ? <Blogs /> : <Navigate replace to='/login' />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
