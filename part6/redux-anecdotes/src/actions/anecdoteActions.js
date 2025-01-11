export const voteAnecdote = (id) => ({
  type: 'VOTE_ANECDOTE',
  payload: { id }
})

export const newAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  payload: { content }
})