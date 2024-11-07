
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
  const courseinfo = props.course

  const total = courseinfo.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <div>
      <Header name={courseinfo.name} />
      <Content parts={courseinfo.parts} />
      <Total total={total} />
    </div>
  )
}



export default Course;