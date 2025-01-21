import { useState } from "react"
import LoginForm from '../components/LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Toggalge from '../components/Toggable'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
      navigate('/')
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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>log in</h2>
      <Toggalge buttonLabel='log in'>
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

export default Login