import { useEffect, useState } from 'react'
import { getPage } from '../services/pages.js'

// Saved content over the defaults, section by section, so a field missing
// from older saved content still has a value
const withDefaults = (defaults, saved) =>
  Object.fromEntries(
    Object.entries(defaults).map(([key, section]) => [
      key,
      { ...section, ...(saved?.[key] || {}) },
    ]),
  )

// Content for a website page managed from the admin. Returns the built-in
// defaults right away, then the saved content once it arrives. If the page
// was never saved or the backend cannot be reached, the defaults stay.
function usePageContent(slug, defaults) {
  const [content, setContent] = useState(defaults)

  useEffect(() => {
    let active = true

    getPage(slug)
      .then((result) => {
        if (active && result?.content) setContent(withDefaults(defaults, result.content))
      })
      .catch(() => {
        // keep the defaults
      })

    return () => {
      active = false
    }
  }, [slug, defaults])

  return content
}

export default usePageContent
