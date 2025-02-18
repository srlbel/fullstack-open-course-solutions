const initialState = {
  message: null,
  type: null,
}

const notificationRecucer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        message: null,
        type: null,
      }
    default:
      return state
  }
}

export default notificationRecucer
