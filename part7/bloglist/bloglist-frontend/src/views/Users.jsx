import { useEffect, useState } from "react"
import userService from '../services/users'
import { Link } from "react-router-dom"
import LoadingScreen from "./LoadingScreen"

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

  if (loading) return <LoadingScreen />

  return (
    <div className="p-5 space-y-2 flex flex-col items-start">
      <h1 className="text-2xl font-semibold">users</h1>
      <table className="table">
        <thead>
          <tr>
            <td>user</td>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id} className="hover">
              <td><Link className='link' to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users