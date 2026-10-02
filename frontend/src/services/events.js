import api from './api'

// published events written in the admin, soonest first
export const getEvents = async () => {
  return api('events')
}
