const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogList) => {
  return blogList.reduce((sum, item) => sum + item.likes, 0);
}

const favoriteBlog = (blogList) => {
  const blog = blogList.reduce((prev, current) =>
    current.likes > prev.likes ? current : prev
  )

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}