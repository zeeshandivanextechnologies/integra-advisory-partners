import api from './api'

// Get all subscribers, newest first
export const getSubscribers = async () => {
  return api('subscribers/admin/all')
}

// Remove subscriber
export const deleteSubscriber = async (id) => {
  return api(`subscribers/admin/${id}`, { method: 'DELETE' })
}
