import api from './api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// { content } is null until the page has been saved once
export const getPage = async (slug) => {
  return api(`pages/${slug}`)
}

export const savePage = async (slug, content) => {
  return api(`pages/${slug}`, {
    method: 'PUT',
    body: { content },
  })
}

// Sends an image or video as the raw request body (api() only sends JSON).
// Resolves with the stored path, e.g. /uploads/abc.webp
export const uploadFile = async (file) => {
  const url = API_BASE_URL
    ? `${API_BASE_URL.replace(/\/$/, '')}/uploads`
    : '/api/uploads'
  const token = localStorage.getItem('adminToken')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: file,
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      response.status === 413
        ? 'This file is too large. The limit is 50 MB.'
        : data?.message || 'Upload failed. Please try again.'
    throw new Error(message)
  }

  return data.url
}
