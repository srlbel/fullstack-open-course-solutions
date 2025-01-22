import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import userServices from '../services/users'
import LoadingScreen from "./LoadingScreen"

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

  if (loading) return <LoadingScreen />

  return (
    <div className="flex flex-col p-5 space-y-2">
      <h1 className="text-2xl font-semibold">{user.name}</h1>
      <h2 className="text-sm">added blogs</h2>
      {blogs.map(blog => <Link to={`/blogs/${blog.id}`} key={blog.id} className="btn justify-start text-left p-auto">{blog.title}</Link>)}
    </div>
  )
}

export default UserDetail