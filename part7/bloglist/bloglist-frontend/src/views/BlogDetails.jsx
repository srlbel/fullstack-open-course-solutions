import { useNavigate, useParams } from "react-router-dom"
import blogService from '../services/blogs'
import { useEffect, useState } from "react"
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from "react-redux"
import CommentForm from "../components/CommentForm"
import LoadingScreen from "./LoadingScreen"

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

  if (isLoading) return <LoadingScreen />

  return (
    <div className="p-5 flex flex-col space-y-2 items-start">
      <h1 className="text-2xl font-semibold">{blog.title}</h1>
      <p className="text-sm">added by {blog.author}</p>
      <a href={blog.url} className="link link-hover text-sm">{blog.url}</a>
      <p>{blog.likes} likes <button className='btn btn-outline btn-primary btn-sm' onClick={() => updateBlog(id, blog)}> like </button></p>
      {isOwner && <button className='btn btn-error btn-outline btn-sm' onClick={() => removeBlog(id, blog)}>delete</button>}

      <h2 className="text-xl font-semibold">comments</h2>
      <CommentForm onSubmit={addComment} />

      <ul className="timeline timeline-vertical timeline-compact">
        {blog.comments.map((comment, i) => {
          return (
            <li key={comment.id}>
              <hr />
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <div className="timeline-end timeline-box">{comment.text}</div>
              <hr />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogDetails