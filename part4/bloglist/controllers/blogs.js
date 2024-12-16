const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) return response.status(401).json({ error: 'Unauthorized User' })

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'Fields Missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params
  const user = request.user
  if (!user) return response.status(401).json({ error: 'Unauthorized User' })

  const blogToDelete = await Blog.findById(id)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blogToDelete.user._id.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'Validation Failed' })
  }

  await Blog.findByIdAndDelete(id)
  return response.status(204).end()
})

blogRoutes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body
  const user = request.user
  if (!user) return response.status(401).json({ error: 'Unauthorized User' })

  if (likes === undefined) {
    response.status(400).json({ error: 'Likes property is required' })
  }

  const blogToUpdate = await Blog.findById(id)
  if (!blogToUpdate) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blogToUpdate.user._id.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'Validation Failed' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true }
  )

  response.status(200).json(updatedBlog)
})


module.exports = blogRoutes
