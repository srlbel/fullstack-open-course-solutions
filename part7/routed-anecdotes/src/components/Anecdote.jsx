import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  if (!anecdote) return <h2> Anecdote not found</h2>

  return (
    <>
      <h2>{anecdote.content} by {anecdote.author} </h2>
      <p> has {anecdote.votes} votes</p>
      <p> for more info see: <a href={anecdote.info}>{anecdote.info}</a></p>
    </>
  )
}

export default Anecdote