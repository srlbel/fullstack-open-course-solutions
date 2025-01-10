const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
  }
]

const listWithOneBlog = [
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10,
  }
]

const emptyList = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 10)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of a list big list', () => {
    const result = listHelper.favoriteBlog(blogs)

    const expectedResult = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    assert.deepStrictEqual(result, expectedResult)
  })
})

describe('most blogs', () => {
  test('of a big list', () => {
    const result = listHelper.mostBlogs(blogs)

    const expectedResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    assert.deepStrictEqual(result, expectedResult)
  })
})

describe('most likes', () => {
  test('of a big list', () => {
    const result = listHelper.mostLikes(blogs)
    const expectedResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    assert.deepStrictEqual(result, expectedResult)
  })
})