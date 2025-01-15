import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import anecdoteService from "../service/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newNote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newNote))
    dispatch(setNotification(`created anecdote with content: '${content}'`))
    setTimeout(() => { dispatch(clearNotification()) }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm