import { useNotificationDispatch } from "../NotificationContext"

export const notificationActions = () => {
  const dispatch = useNotificationDispatch()

  const setNotification = (content, timeout = 5000) => {

    dispatch({ type: 'SET_NOTIFICATION', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)
  }

  return { setNotification }
}