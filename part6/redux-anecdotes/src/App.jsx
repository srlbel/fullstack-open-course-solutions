import BlogForm from './components/blogForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <BlogForm />
    </div>
  )
}

export default App