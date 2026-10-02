import api from './api'

// built from recent saves and upcoming events (see backend/services/notificationService.js)
export const getNotifications = async (limit = 10) => {
  return api(`notifications?limit=${limit}`)
}
