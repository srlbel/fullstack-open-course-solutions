import { createStore } from 'redux'
import { combineReducers } from 'redux'

import notificationRecucer from './reducers/notificationReducer'

const store = createStore(combineReducers({ notification: notificationRecucer }))

export default store
