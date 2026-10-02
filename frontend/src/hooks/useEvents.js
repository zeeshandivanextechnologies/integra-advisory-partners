import { useEffect, useState } from 'react'
import localEvents from '../constants/events.js'
import { getEvents } from '../services/events.js'

// Backend event -> the shape the Events page already uses
const toSiteEvent = (event) => ({
  title: event.title,
  format: event.format,
  date: event.date,
  time: event.time,
  location: event.location,
  mode: event.mode,
  registerUrl: event.registerUrl || undefined,
})

// Published events from the admin (Events).
// Starts with constants/events.js and keeps it if the backend cannot be
// reached or has no published events yet. Past dates are filtered by the page.
function useEvents() {
  const [events, setEvents] = useState(localEvents)

  useEffect(() => {
    let active = true

    getEvents()
      .then((result) => {
        // the admin's events replace the local list, so an event never shows twice
        if (active && Array.isArray(result?.events) && result.events.length > 0) {
          setEvents(result.events.map(toSiteEvent))
        }
      })
      .catch(() => {
        // keep the local list
      })

    return () => {
      active = false
    }
  }, [])

  return events
}

export default useEvents
