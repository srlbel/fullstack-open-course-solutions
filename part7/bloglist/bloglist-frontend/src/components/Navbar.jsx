import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import blogService from '../services/blogs'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch({ type: 'CLEAR_USER' })
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <>
      <div>
        <Link to='/'>blogs</Link> {" "}
        <Link to='/users'>users</Link>
        {user && <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>}
      </div>
    </>
  )
}

export default Navbar