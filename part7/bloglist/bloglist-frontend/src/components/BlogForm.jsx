import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      url,
    })

    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className='gap-2 flex'>
      <label className='input input-bordered flex items-center gap-2'>
        Title
        <input
          className='grow'
          type='text'
          value={title}
          name='title'
          placeholder='title'
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        Url
        <input
          className='grow'
          type='text'
          value={url}
          name='url'
          placeholder='url'
          onChange={(event) => setUrl(event.target.value)}
        />
      </label>
      <button type='submit' className='btn btn-outline'>post blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
