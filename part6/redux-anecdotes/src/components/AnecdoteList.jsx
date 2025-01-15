import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../actions/anecdoteActions'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdote }) => {
    if (filter === 'ALL') return anecdote

    return anecdote.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList