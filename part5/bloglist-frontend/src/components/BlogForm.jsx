import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      url
    })

    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type='text'
          value={title}
          name='title'
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='url'
          onChange={event => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">post blog</button>
    </form>
  )
}

export default BlogForm;