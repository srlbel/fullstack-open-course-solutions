import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../service/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateObject(state, action) {
      const updatedAnecdote = action.payload
      const updatedAnecdotes = state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
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

export const { updateObject, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

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

export const updateAnecdote = (newAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateItem(newAnecdote)
    dispatch(updateObject(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer