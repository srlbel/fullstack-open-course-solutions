import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.type) return null

  if (notification.type === 'error') {
    return (
      <div className='toast'>
        <div className='alert alert-error shadow-lg'>
          <span className='text-white'>{notification.message} </span>
        </div>
      </div>
    )
  }

  if (notification.type === 'success') {
    return (
      <div className='toast'>
        <div className='alert alert-success shadow-lg'>
          <span className='text-white'>{notification.message} </span>
        </div>
      </div>
    )
  }


  return (
    <div className='toast'>
      <div className='alert shadow-lg bg-base-300'>
        <span className='text-black'>{notification.message} </span>
      </div>
    </div>
  )
}

export default Notification
