import { configureStore } from '@reduxjs/toolkit'

import notificationRecucer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationRecucer,
    blogs: blogReducer
  }
})

export default store
