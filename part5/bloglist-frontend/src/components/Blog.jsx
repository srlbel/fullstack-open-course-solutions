import { useState } from "react"

const ToggableBlog = (props) => {
  const blogStyle = {
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 1,
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <p>{props.title} - {props.author}<button onClick={toggleVisibility}>view</button></p>

      <div style={showWhenVisible}>
        <p>{props.url}</p>
        <p>likes {props.likes}<button>like</button></p>
        <p>{props.author}</p>
      </div>
    </div>
  )
}

const Blog = ({ blog, updateLikes }) =>
  <ToggableBlog
    title={blog.title}
    author={blog.author}
    url={blog.url}
    likes={blog.likes}
  />


export default Blog