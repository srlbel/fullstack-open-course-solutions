const Notification = ({ message, type }) => {
  if (type === 'error') {
    return <div className='notification error'> {message} </div>
  }

  if (type === 'success') {
    return <div className='notification success'> {message} </div>
  }

  return <p> fallback </p>
}

export default Notification
