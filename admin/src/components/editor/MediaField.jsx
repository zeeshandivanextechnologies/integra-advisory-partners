import { useRef, useState } from 'react'
import { FiAlertCircle, FiFilm, FiImage, FiUpload, FiX } from 'react-icons/fi'
import { websiteUrl } from '../../constants/site.js'
import { isUploadPath, uploadUrl } from '../../utils/media.js'
import TextField from './TextField.jsx'

// Uploaded files live on the backend; other paths like /images/x.webp are
// files on the website, not in the admin
const previewUrl = (src) => {
  if (isUploadPath(src)) return uploadUrl(src)
  return src.startsWith('/') ? `${websiteUrl}${src}` : src
}

// file types the backend accepts (see backend/controllers/uploadController.js)
const uploadTypes = {
  image: 'image/jpeg,image/png,image/webp,image/gif',
  video: 'video/mp4,video/webm',
}

// Image or video with a preview. onChange receives { src } or { alt }.
// The alt text box shows only when an alt value is passed.
// onUpload(file) -> Promise<path> sends the file to the backend; without it
// the field only shows a local preview.
function MediaField({ id, label, src, alt, onChange, onUpload, video = false, hint }) {
  const fileInput = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const EmptyIcon = video ? FiFilm : FiImage

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!onUpload) {
      onChange({ src: URL.createObjectURL(file) })
      return
    }

    setUploading(true)
    setUploadError('')
    try {
      const path = await onUpload(file)
      onChange({ src: path })
    } catch (error) {
      setUploadError(error.message || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  let accept = video ? 'video/*' : 'image/*'
  if (onUpload) accept = video ? uploadTypes.video : uploadTypes.image

  return (
    <div className="pe-media">
      <div className={`pe-media-preview ${src ? '' : 'empty'}`}>
        {src && video && (
          <video src={previewUrl(src)} muted loop autoPlay playsInline />
        )}
        {src && !video && <img src={previewUrl(src)} alt="" />}
        {!src && (
          <span className="pe-media-empty">
            <EmptyIcon />
            No {video ? 'video' : 'image'}
          </span>
        )}
      </div>

      <div className="pe-media-top">
        <span className="pe-media-label">{label}</span>
        <div className="pe-media-actions">
          <button
            type="button"
            className="pe-btn outline sm"
            disabled={uploading}
            onClick={() => fileInput.current?.click()}
          >
            <FiUpload />
            {uploading ? 'Uploading...' : src ? 'Replace' : 'Upload'}
          </button>
          {src && (
            <button
              type="button"
              className="pe-btn danger sm"
              aria-label={`Remove ${label.toLowerCase()}`}
              disabled={uploading}
              onClick={() => onChange({ src: '' })}
            >
              <FiX />
            </button>
          )}
        </div>
        <input
          ref={fileInput}
          type="file"
          accept={accept}
          hidden
          onChange={handleFile}
        />
      </div>

      {uploadError && (
        <p className="pe-media-error" role="alert">
          <FiAlertCircle />
          {uploadError}
        </p>
      )}

      {hint && <p className="pe-hint">{hint}</p>}

      {alt !== undefined && (
        <TextField
          id={`${id}-alt`}
          label="Alt text"
          value={alt}
          placeholder="Describe the image for screen readers"
          onChange={(value) => onChange({ alt: value })}
        />
      )}
    </div>
  )
}

export default MediaField
