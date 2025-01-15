export const setNotification = (notification) => {
  return {
    type: 'notification/setNotification',
    payload: notification
  }
}

export const clearNotification = () => {
  return {
    type: 'notification/clearNotification'
  }
}