import { useEffect, useState } from 'react'
import localArticles from '../constants/articles.js'
import { getArticles } from '../services/articles.js'

// Backend article -> the shape the Insights and Article pages already use.
// An article with an external link has no page here, so it gets no slug.
const toSiteArticle = (article) => ({
  slug: article.url ? undefined : article.slug,
  url: article.url || undefined,
  title: article.title,
  category: article.category,
  date: article.date,
  readTime: article.readTime,
  excerpt: article.excerpt,
  body: article.body,
})

// Published articles from the admin (Articles).
// Starts with constants/articles.js and keeps it if the backend cannot be
// reached or has no published articles yet.
// loading is true until the backend has answered.
function useArticles() {
  const [articles, setArticles] = useState(localArticles)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getArticles()
      .then((result) => {
        // the admin's articles replace the local list, so the same article
        // never shows twice
        if (active && Array.isArray(result?.articles) && result.articles.length > 0) {
          setArticles(result.articles.map(toSiteArticle))
        }
      })
      .catch(() => {
        // keep the local list
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { articles, loading }
}

export default useArticles
