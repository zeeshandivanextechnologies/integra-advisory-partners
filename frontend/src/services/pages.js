import api from './api'

// Content saved from the admin for one website page.
// Resolves with { content } where content is null until the page is saved.
export const getPage = async (slug) => {
  return api(`pages/${slug}`)
}
