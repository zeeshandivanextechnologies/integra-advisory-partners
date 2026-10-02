import api from './api'

// all events, drafts and past events included, soonest first
export const getEvents = async () => {
  return api('events/admin/all')
}

export const getEvent = async (id) => {
  return api(`events/admin/${id}`)
}

export const createEvent = async (event) => {
  return api('events/admin', { method: 'POST', body: event })
}

export const updateEvent = async (id, event) => {
  return api(`events/admin/${id}`, { method: 'PUT', body: event })
}

export const deleteEvent = async (id) => {
  return api(`events/admin/${id}`, { method: 'DELETE' })
}
