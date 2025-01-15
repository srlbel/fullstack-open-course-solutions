import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Notification Test',
  reducers: {
    setNotification(state, action) {
      const { notification } = action.payload
      return notification
    },

    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
