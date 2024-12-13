const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});

  response.status(200).json(blogs);
});

blogRoutes.post("/", async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'Fields Missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  });

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
});

module.exports = blogRoutes;
