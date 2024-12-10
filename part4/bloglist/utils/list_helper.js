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

const mostBlogs = (blogList) => {
  const authorCounts = blogList.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {})

  let maxAuthor = null
  let maxBlogs = 0;

  Object.entries(authorCounts).forEach(([author, count]) => {
    if (count > maxBlogs) {
      maxAuthor = author
      maxBlogs = count
    }
  })

  return {
    "author": maxAuthor,
    "blogs": maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}