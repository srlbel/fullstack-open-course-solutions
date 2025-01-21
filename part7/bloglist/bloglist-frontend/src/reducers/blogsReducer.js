import blogService from '../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'LIKE_BLOG':
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload)
    default:
      return state
  }
}

export default blogReducer

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch({ type: 'LIKE_BLOG', payload: updatedBlog })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({ type: 'DELETE_BLOG', payload: id })
    } catch (e) {
      console.error('Error deleting blog: ', e)
    }
  }
}