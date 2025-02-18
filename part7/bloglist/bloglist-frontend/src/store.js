import { configureStore } from '@reduxjs/toolkit'

import notificationRecucer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationRecucer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store
