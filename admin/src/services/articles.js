import api from './api'

// all articles, drafts included, newest first
export const getArticles = async () => {
  return api('articles/admin/all')
}

export const getArticle = async (id) => {
  return api(`articles/admin/${id}`)
}

export const createArticle = async (article) => {
  return api('articles/admin', { method: 'POST', body: article })
}

export const updateArticle = async (id, article) => {
  return api(`articles/admin/${id}`, { method: 'PUT', body: article })
}

export const deleteArticle = async (id) => {
  return api(`articles/admin/${id}`, { method: 'DELETE' })
}
