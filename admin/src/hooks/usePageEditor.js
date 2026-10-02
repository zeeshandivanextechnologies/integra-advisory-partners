import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getPage, savePage } from '../services/pages.js'

// Saved content over the defaults, section by section, so a field added to
// the editor later still has a value for pages saved before it existed
const withDefaults = (defaults, saved) =>
  Object.fromEntries(
    Object.entries(defaults).map(([key, section]) => [
      key,
      { ...section, ...(saved?.[key] || {}) },
    ]),
  )

// Editing state for one website page.
// sections: [{ key, title, icon, description }] in website order; a section
// whose content has a `visible` flag gets the Visible / Hidden switch.
// options.slug: the backend page ('about', ...). With it the editor loads the
// saved content and Save sends it to the backend; without it Save only keeps
// the changes on screen.
// options.savedMessage: toast text after a save (default "<Slug> page saved successfully!")
function usePageEditor(initialContent, sections, idPrefix, { slug, savedMessage } = {}) {
  const [content, setContent] = useState(initialContent)
  const [savedContent, setSavedContent] = useState(initialContent)
  const [justSaved, setJustSaved] = useState(false)
  const [loading, setLoading] = useState(Boolean(slug))
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const dirty = content !== savedContent

  // load what was last saved; until then the defaults stay in place
  useEffect(() => {
    if (!slug) return undefined
    let active = true

    getPage(slug)
      .then((result) => {
        if (!active || !result?.content) return
        const loaded = withDefaults(initialContent, result.content)
        setContent(loaded)
        setSavedContent(loaded)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug, initialContent])

  // warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!dirty) return undefined
    const handleBeforeUnload = (event) => event.preventDefault()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dirty])

  useEffect(() => {
    if (!justSaved) return undefined
    const timer = setTimeout(() => setJustSaved(false), 4000)
    return () => clearTimeout(timer)
  }, [justSaved])

  const sectionId = (key) => `${idPrefix}-${key}`

  const update = (key, changes) =>
    setContent((current) => ({ ...current, [key]: { ...current[key], ...changes } }))

  // id, value, and onChange for a field stored at content[key][name]
  const bind = (key, name) => ({
    id: `${sectionId(key)}-${name}`,
    value: content[key][name],
    onChange: (value) => update(key, { [name]: value }),
  })

  // props for <EditorSection>
  const sectionProps = (key) => {
    const index = sections.findIndex((section) => section.key === key)
    const { title, icon, description } = sections[index]
    const props = { id: sectionId(key), number: index + 1, title, icon, description }

    if (content[key].visible === undefined) return props
    return {
      ...props,
      visible: content[key].visible,
      onToggleVisible: (visible) => update(key, { visible }),
    }
  }

  const save = async () => {
    if (!slug) {
      // TODO: send content to the backend
      setSavedContent(content)
      setJustSaved(true)
      return
    }

    // edits made while the request is running stay marked as unsaved
    const snapshot = content
    setSaving(true)
    setSaveError('')
    try {
      await savePage(slug, snapshot)
      setSavedContent(snapshot)
      setLoadError(false)
      setJustSaved(true)
      // same solid green toast as login; "about" -> "About page saved..."
      const pageName = slug.charAt(0).toUpperCase() + slug.slice(1)
      toast.success(savedMessage || `${pageName} page saved successfully!`, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      })
    } catch (error) {
      setSaveError(error.message || 'Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const discard = () => {
    setContent(savedContent)
    setSaveError('')
  }

  return {
    content,
    dirty,
    justSaved,
    connected: Boolean(slug),
    loading,
    loadError,
    saving,
    saveError,
    sectionId,
    update,
    bind,
    sectionProps,
    save,
    discard,
  }
}

export default usePageEditor
