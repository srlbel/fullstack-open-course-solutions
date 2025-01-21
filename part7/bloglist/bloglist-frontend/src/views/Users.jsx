import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import userService from '../services/users'

const Users = () => {
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll()
        console.log(response)
        setUsers(response)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div> Loading...</div>

  return (
    <>
      <h1>blogs</h1>
      <p>
        {user.name} logged in.
        <button onClick={() => handleLogout()}>log out</button>
      </p>

      <h1>users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users