const Togglable = (props) => {
  return (
    <div className='collapse bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>{props.buttonLabel}</div>
      <div className='collapse-content'>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable
