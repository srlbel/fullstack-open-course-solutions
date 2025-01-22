//libs
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

//utils
const config = require('./utils/config')
const logger = require('./utils/logger')

// routes & middleware
const blogRoutes = require('./controllers/blogs')
const usersRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const middleware = require('./utils/middleware')
const commentRoutes = require('./controllers/comments')




const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB')
  })
  .catch((e) => {
    logger.error('error conecting to MONGODB: ', e.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRoutes)
app.use('/api/blogs', commentRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/login', loginRoutes)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}



app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
