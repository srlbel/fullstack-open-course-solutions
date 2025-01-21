const initialState = []

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    default:
      return state
  }
}

export default blogReducer
