const commentRoutes = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')

commentRoutes.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id).populate('comments')

  if (!blog) return response.status(404).json({ error: 'Blog not found ' })

  response.json(blog)
})

commentRoutes.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { text } = request.body

  if (!text) return response.status(400).json({ error: 'Fields Missing' })

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).json({ error: 'Blog not found' })

  const comment = new Comment({ text })
  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = commentRoutes