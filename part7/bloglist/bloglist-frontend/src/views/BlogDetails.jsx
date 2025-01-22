import { useNavigate, useParams } from "react-router-dom"
import blogService from '../services/blogs'
import { useEffect, useState } from "react"
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from "react-redux"
import CommentForm from "../components/CommentForm"

const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [blog, setBlog] = useState({})
  const [isLoading, setLoading] = useState(true)

  const user = useSelector(state => state.user)
  const isOwner = user.name === blog.author

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogService.getComments(id)
        setBlog(response)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    fetchBlog()
  }, [id])

  const updateBlog = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(id, updatedBlog))
    setBlog(updatedBlog)
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `added like to '${updatedBlog.title}' by ${updatedBlog.author}.`,
        type: 'success',
      },
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const removeBlog = () => {
    const isAccepted = window.confirm(
      `You are about to delete ${blog.title} by ${blog.author}. Continue?`
    )

    if (!isAccepted) return

    dispatch(deleteBlog(id))

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `'${blog.title}' by ${blog.author} was removed from the records.`,
        type: 'success',
      },
    })

    navigate('/')
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const addComment = async (commentData) => {
    const text = commentData
    const newComment = await blogService.addComment(id, text)
    setBlog({
      ...blog, comments: blog.comments.concat(newComment)
    })

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        message: `added comment '${newComment.text}'.`,
        type: 'success',
      },
    })

    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => updateBlog(id, blog)}> like </button></p>
      <p>added by {blog.author}</p>
      {isOwner && <button onClick={() => removeBlog(id, blog)}>delete</button>}

      <h2>comments</h2>
      <CommentForm onSubmit={addComment} />
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </>
  )
}

export default BlogDetails