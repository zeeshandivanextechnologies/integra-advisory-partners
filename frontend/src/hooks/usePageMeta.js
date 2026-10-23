import { useEffect } from 'react'

const SITE_NAME = 'Integra Advisory Partners'

function usePageMeta(title, description) {
  useEffect(() => {
    // Format title to optimal Google SEO length (50-60 characters)
    let finalTitle = SITE_NAME
    if (title && title.trim()) {
      const cleanTitle = title.trim()
      if (cleanTitle.includes(SITE_NAME)) {
        finalTitle = cleanTitle
      } else {
        // e.g. "Services | Qatar & GCC Advisory | Integra Advisory Partners"
        finalTitle = `${cleanTitle} | Qatar & GCC Advisory | ${SITE_NAME}`
      }
    } else {
      finalTitle = `${SITE_NAME} | Qatar & GCC Market Entry Advisory`
    }
    document.title = finalTitle

    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) {
      let cleanDesc = description.trim()
      // If description exceeds Google's 160 character limit, trim at word boundary
      if (cleanDesc.length > 160) {
        cleanDesc = cleanDesc.slice(0, 157).replace(/\s+\S*$/, '') + '...'
      }
      meta.setAttribute('content', cleanDesc)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description])
}

export default usePageMeta
