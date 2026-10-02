import api from './api'

// published articles written in the admin, newest first
export const getArticles = async () => {
  return api('articles')
}
