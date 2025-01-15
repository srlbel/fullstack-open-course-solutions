import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../service/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const { id } = action.payload
      const updatedAnecdotes = state.map(anecdote => anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
      return updatedAnecdotes
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    appendAnecdote(state, action) {
      const content = action.payload
      const updatedAnecdotes = state.concat(content)
      return updatedAnecdotes
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer