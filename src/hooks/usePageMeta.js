import { useEffect } from 'react'

const SITE_NAME = 'Integra Advisory Partners'

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) {
      meta.setAttribute('content', description)
    }
  }, [title, description])
}

export default usePageMeta
