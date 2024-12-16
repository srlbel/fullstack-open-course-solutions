const blogRoutes = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.JWT_SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'Fields Missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
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
  const deletedBlog = await Blog.findByIdAndDelete(id)

  if (!deletedBlog) {
    response.status(404).json({ error: 'Blog not found' })
  }

  response.status(204).end()
})

blogRoutes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  if (likes === undefined) {
    response.status(400).json({ error: 'Likes property is required' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true }
  )

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.status(200).json(updatedBlog)
})


module.exports = blogRoutes
