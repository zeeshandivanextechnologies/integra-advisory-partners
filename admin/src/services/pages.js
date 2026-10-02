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

// Uploads an image or video and resolves with the address to store in page
// content. When the backend has Supabase Storage set up, the file goes straight
// to Storage through a one-time link (large videos would be too big to pass
// through the backend on Vercel); otherwise it goes to the backend as before.
export const uploadFile = async (file) => {
  let signed = null
  try {
    signed = await api('uploads/sign', {
      method: 'POST',
      body: { contentType: file.type, size: file.size },
    })
  } catch (error) {
    // an older backend without /uploads/sign: fall back to the backend upload
    if (error.status !== 404) throw error
  }

  if (signed?.mode === 'direct') {
    const response = await fetch(signed.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type, 'x-upsert': 'false' },
      body: file,
    })
    if (!response.ok) throw new Error('Upload failed. Please try again.')
    return signed.url
  }

  return uploadThroughBackend(file)
}

// Sends an image or video as the raw request body (api() only sends JSON).
// Resolves with the stored path, e.g. /uploads/abc.webp
const uploadThroughBackend = async (file) => {
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
