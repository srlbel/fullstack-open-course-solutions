const commentRoutes = require('express').Router()
const Blog = require('../models/blog')

commentRoutes.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findById(id)

  if (!blog) return response.status(404).json({ error: 'Blog not found ' })

  response.json(blog.comments)
})

commentRoutes.post(':id/comments', async (request, response) => {
  const { id } = request.params
  const { text } = request.body

  if (!text) return response.status(400).json({ error: 'Fields Missing' })

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).json({ error: 'Blog not found' })

  blog.comments = [...(blog.comments), { text }]
  await blog.save()

  response.status(201).json({ text })
})

module.exports = commentRoutes