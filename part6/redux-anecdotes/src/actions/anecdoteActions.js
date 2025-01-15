export const voteAnecdote = (id) => ({
  type: 'anecdotes/voteAnecdote',
  payload: { id }
})

export const newAnecdote = (content) => ({
  type: 'anecdotes/createAnecdote',
  payload: { content }
})