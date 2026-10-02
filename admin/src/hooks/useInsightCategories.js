import { useEffect, useState } from 'react'
import insightsPage from '../constants/insightsPage.js'
import { getPage } from '../services/pages.js'

// Article categories are the ones set on the Insights page editor.
// Returns the defaults until the saved Insights page content arrives.
function useInsightCategories() {
  const [categories, setCategories] = useState(insightsPage.publish.categories)

  useEffect(() => {
    let active = true

    getPage('insights')
      .then((result) => {
        const saved = result?.content?.publish?.categories
        if (active && Array.isArray(saved) && saved.length > 0) setCategories(saved)
      })
      .catch(() => {
        // keep the defaults
      })

    return () => {
      active = false
    }
  }, [])

  return categories
}

export default useInsightCategories
