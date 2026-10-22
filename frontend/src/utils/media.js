const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Backend origin, e.g. http://localhost:5000 (empty when the API is on this host)
const apiOrigin = /^https?:\/\//.test(API_BASE_URL) ? new URL(API_BASE_URL).origin : ''

// Images and videos uploaded from the admin are stored as /uploads/... on the
// backend. Other paths (like /images/x.webp) are files in this site's public folder.
export const mediaUrl = (src, version) => {
  if (typeof src !== 'string' || !src) return src
  const base = src.startsWith('/uploads/') ? `${apiOrigin}${src}` : src
  if (!version) return base
  const v =
    version instanceof Date
      ? version.getTime()
      : typeof version === 'string'
      ? new Date(version).getTime() || version
      : version
  return base.includes('?') ? `${base}&v=${v}` : `${base}?v=${v}`
}
