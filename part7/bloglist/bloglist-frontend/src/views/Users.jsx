import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import userService from '../services/users'
import { Link } from "react-router-dom"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll()
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
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users