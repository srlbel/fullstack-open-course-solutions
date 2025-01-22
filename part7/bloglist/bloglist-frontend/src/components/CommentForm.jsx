import { useState } from "react"

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className="join">
      <input
        className="input input-bordered join-item input-sm"
        name='text'
        type='text'
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <button className='btn join-item btn-sm' type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm