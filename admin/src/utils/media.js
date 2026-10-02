const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Backend origin, e.g. http://localhost:5000. Empty when the API is served
// from the same host as the admin.
export const apiOrigin = /^https?:\/\//.test(API_BASE_URL)
  ? new URL(API_BASE_URL).origin
  : ''

// Files uploaded from the admin are stored as /uploads/... on the backend
export const isUploadPath = (src) => typeof src === 'string' && src.startsWith('/uploads/')

export const uploadUrl = (src) => `${apiOrigin}${src}`
