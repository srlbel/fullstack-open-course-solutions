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
    <div className="navbar bg-base-200">
      <div className="flex-1 space-x-2">
        <Link to='/' className="btn">blogs</Link> {" "}
        <Link to='/users' className="btn">users</Link>
      </div>
      {
        user ?
          <div className="flex space-x-2">
            <p className="italic">{user.name} logged in</p>
            <button onClick={handleLogout} className="btn btn-error">
              logout
            </button>
          </div> :
          <Link to='/login' className="btn">login</Link>
      }
    </div>
  )
}

export default Navbar