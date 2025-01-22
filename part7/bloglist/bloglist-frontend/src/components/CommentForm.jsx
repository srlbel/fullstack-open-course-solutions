import { useState } from "react"

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='text'
        type='text'
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm