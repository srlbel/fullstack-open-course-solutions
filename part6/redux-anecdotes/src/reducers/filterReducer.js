const filterReducer = (state = 'ALL', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER': {
      const { filter } = action.payload
      return filter
    }
    default:
      return state
  }
}

export default filterReducer