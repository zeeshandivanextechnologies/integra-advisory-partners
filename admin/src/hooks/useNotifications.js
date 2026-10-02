import { useCallback, useEffect, useState } from 'react'
import { getNotifications } from '../services/notifications.js'

// Which notifications this browser has read. Kept in localStorage, so it is
// per browser; the list itself comes from the backend.
const READ_KEY = 'adminReadNotifications'
const READ_EVENT = 'admin-notifications-read'
const MAX_REMEMBERED = 300

const readIds = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(READ_KEY) || '[]')
    return new Set(Array.isArray(stored) ? stored : [])
  } catch {
    return new Set()
  }
}

const saveReadIds = (ids) => {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids].slice(-MAX_REMEMBERED)))
  } catch {
    // storage full or blocked: the dot just stays
  }
  // let the bell and the Notifications page stay in step
  window.dispatchEvent(new Event(READ_EVENT))
}

// "2 hours ago"; reminders have no time
export const timeAgo = (value) => {
  if (!value) return 'Coming up'
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  const [unit, size] = units.find(([, length]) => seconds >= length)
  const count = Math.floor(seconds / size)
  return `${count} ${unit}${count === 1 ? '' : 's'} ago`
}

function useNotifications(limit = 10) {
  const [items, setItems] = useState([])
  const [read, setRead] = useState(readIds)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    return getNotifications(limit)
      .then((result) => {
        setItems(result.notifications || [])
        setError('')
      })
      .catch((err) => setError(err.message || 'Could not load notifications.'))
      .finally(() => setLoading(false))
  }, [limit])

  useEffect(() => {
    reload()
  }, [reload])

  // another part of the admin marked something as read
  useEffect(() => {
    const sync = () => setRead(readIds())
    window.addEventListener(READ_EVENT, sync)
    return () => window.removeEventListener(READ_EVENT, sync)
  }, [])

  const markRead = (id) => {
    const next = readIds()
    next.add(id)
    saveReadIds(next)
  }

  const markAllRead = () => {
    const next = readIds()
    items.forEach((item) => next.add(item.id))
    saveReadIds(next)
  }

  const notifications = items.map((item) => ({ ...item, unread: !read.has(item.id) }))
  const unreadCount = notifications.filter((item) => item.unread).length

  return { notifications, unreadCount, loading, error, reload, markRead, markAllRead }
}

export default useNotifications
