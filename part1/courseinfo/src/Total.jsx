const Total = (props) => {
  const exercises = props.total;
  const total = exercises[0].exercises + exercises[1].exercises + exercises[2].exercises

  return (
    <p> Number of exercises {total}</p>
  )
}

export default Total;