import { createStore } from 'redux'
import { combineReducers } from 'redux'

import notificationRecucer from './reducers/notificationReducer'
import blogReducer from './reducers/blogsReducer'

const store = createStore(
  combineReducers({ notification: notificationRecucer, blogs: blogReducer })
)

export default store
