const initialState = {
  name: null,
  token: null,
  username: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        name: action.payload.name,
        token: action.payload.token,
        username: action.payload.username
      }

    case 'CLEAR_USER': return null
    default: return state
  }
}

export default userReducer