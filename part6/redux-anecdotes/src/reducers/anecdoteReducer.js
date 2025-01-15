import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const { content } = action.payload
      const updatedAnecdotes = state.concat(content)
      return updatedAnecdotes
    },

    voteAnecdote(state, action) {
      const { id } = action.payload
      const updatedAnecdotes = state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
      return updatedAnecdotes
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer