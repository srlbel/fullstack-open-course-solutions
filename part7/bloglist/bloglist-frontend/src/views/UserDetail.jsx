import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userServices from '../services/users'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userServices.getOne(id)
        setUser(response)
        setBlogs(response.blogs)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUser()
  }, [id])

  if (loading) return <div>loading</div>

  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

export default UserDetail