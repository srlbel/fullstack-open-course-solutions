const BlogForm = ({ handleSubmit, title, setTitle, url, setUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.url)}
        />
      </div>
      <button type="submit">post blog</button>
    </form>
  )
}

export default BlogForm;