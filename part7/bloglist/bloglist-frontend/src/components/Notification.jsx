import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.type) return null

  if (notification.type === 'error') {
    return <div className='notification error'> {notification.message} </div>
  }

  if (notification.type === 'success') {
    return <div className='notification success'> {notification.message} </div>
  }

  return <div className='notification'> {notification.message}</div>
}

export default Notification
