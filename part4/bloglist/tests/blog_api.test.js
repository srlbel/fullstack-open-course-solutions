const { test, after, beforeEach, describe, before } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token
const api = supertest(app)

const initialBlogs = [
  {
    title: 'A title',
    url: 'http://localhost',
    author: 'Linus Torvalds',
    likes: 15,
  },
  {
    title: 'Nowhere like home',
    url: 'http://127.0.0.1',
    author: 'Terry',
    likes: 5,
  },
]

before(async () => {
  await User.deleteMany({})
  const password = await bcrypt.hash('test', 10)
  const user = new User({ username: 'test', name: 'testing', passwordHash: password })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'test', password: 'test' })

  token = loginResponse.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog endpoint tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blogs return with id instead of _id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
  })

  test('creating a new blog increases the total count by one', async () => {
    const newBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogs = await Blog.find({})
    assert.strictEqual(totalBlogs.length, initialBlogs.length + 1)
  })

  test('missing likes default to 0', async () => {
    const newBlog = {
      title: 'new title',
      author: 'new author',
      url: 'new url',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    assert.strictEqual(savedBlog.likes, 0)
  })

  test('fails with status 400 when title is missing', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://example.com',
      likes: 10,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(response.status, 400)
  })

  test('fails with status 400 when url is missing', async () => {
    const newBlog = {
      author: 'Test Author',
      title: 'Test Title',
      likes: 10,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(response.status, 400)
  })

  test('succeeds with status code 204 if blog is deleted', async () => {
    const newBlog = {
      likes: 0,
      title: 'delete test',
      url: 'url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const blogTest = blogs.find(blog => blog.title === newBlog.title)
    const blogToDelete = blogTest._id.toString()

    const response = await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    assert.strictEqual(response.status, 204)
  })

  test('succeeds with status code 200 and updates likes', async () => {
    const newBlog = {
      likes: 0,
      title: 'update test',
      url: 'url'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const blogTest = blogs.find(blog => blog.title === newBlog.title)
    const blogToUpdate = blogTest._id.toString()

    const updatedData = { likes: blogTest.likes + 1 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, updatedData.likes)
  })

  test('fails to add a new blog with status code 401 if token is missing', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      url: 'url',
      likes: 0,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.status, 401)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, 2)
  })
})

after(async () => {
  await mongoose.connection.close()
})
