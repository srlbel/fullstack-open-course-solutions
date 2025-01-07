import { useState } from "react";

const ToggableBlog = ({ title, author, url, likes, id, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  const updateLikes = () => {
    const updatedBlog = {
      title,
      author,
      url,
      likes: likes + 1,
      id,
    };

    updateBlog(id, updatedBlog);
  };

  const removeBlog = () => {
    const blogToDelete = id

    const isAccepted = window.confirm(`You are about to delete ${title} by ${author}. Continue?`)

    if (isAccepted) deleteBlog(blogToDelete, { title, author })
  }

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <p>
        {title} - {author}
        <button onClick={toggleVisibility}>view</button>
      </p>

      <div style={showWhenVisible}>
        <p>{url}</p>
        <p>
          likes {likes}
          <button onClick={updateLikes}>like</button>
        </p>
        <p>{author}</p>
        <button onClick={removeBlog}>delete</button>
      </div>
    </div>
  );
};

const Blog = ({ blog, updateBlog, deleteBlog }) => (
  <ToggableBlog
    title={blog.title}
    id={blog.id}
    author={blog.author}
    url={blog.url}
    likes={blog.likes}
    updateBlog={updateBlog}
    deleteBlog={deleteBlog}
  />
);

export default Blog;
