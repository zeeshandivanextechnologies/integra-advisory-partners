import {
  FiAlertCircle,
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiRotateCcw,
  FiSave,
} from 'react-icons/fi'
import { websiteUrl } from '../../constants/site.js'
import Loader from '../common/Loader.jsx'
import '../../styles/PageEditor.css'

// Banner, section nav, and save bar shared by the website page editors.
// `editor` is the object returned by usePageEditor.
// title and crumb are optional; by default the banner reads "<pageName> page"
// under "Website Pages"
function PageEditorLayout({
  pageName,
  path,
  intro,
  sections,
  editor,
  children,
  title = `${pageName} page`,
  crumb = 'Website Pages',
}) {
  const {
    content,
    dirty,
    justSaved,
    connected,
    loading,
    loadError,
    saving,
    saveError,
    sectionId,
    save,
    discard,
  } = editor

  if (loading) return <Loader label={`Loading ${pageName.toLowerCase()} page content`} />

  const toggleable = sections.filter((section) => content[section.key].visible !== undefined)
  const visibleCount = toggleable.filter((section) => content[section.key].visible).length

  return (
    <div className="pe">
      {/* ---------- banner ---------- */}
      <section className="pe-banner">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="pe-banner-crumb">
              {crumb} <FiChevronRight /> {pageName}
            </span>
            <h2 className="pe-banner-title">{title}</h2>
            <p className="pe-banner-text">{intro}</p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <a
              href={`${websiteUrl}${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pe-btn ghost"
            >
              View on Website <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <div className="row">
        {/* ---------- section nav ---------- */}
        <div className="col-xl-3 mb-3">
          <aside className="pe-nav" aria-label="Page sections">
            <span className="pe-nav-label">Page sections</span>
            <ul>
              {sections.map((section, index) => {
                const hidden = content[section.key].visible === false
                return (
                  <li key={section.key}>
                    <a href={`#${sectionId(section.key)}`} className="pe-nav-link">
                      <span className="pe-nav-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="pe-nav-text">{section.title}</span>
                      {hidden && <span className="pe-nav-badge">Hidden</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
            {toggleable.length > 0 && (
              <p className="pe-nav-foot">
                {visibleCount} of {toggleable.length} sections visible
              </p>
            )}
          </aside>
        </div>

        {/* ---------- sections ---------- */}
        <div className="col-xl-9">{children}</div>
      </div>

      {/* ---------- save bar ---------- */}
      <div className={`pe-savebar ${dirty ? 'dirty' : ''}`}>
        <span
          className={`pe-savebar-status ${saveError || (loadError && !dirty) ? 'error' : ''}`}
          role="status"
        >
          {saveError && (
            <>
              <FiAlertCircle />
              {saveError}
            </>
          )}
          {!saveError && saving && (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              Saving...
            </>
          )}
          {!saveError && !saving && dirty && (
            <>
              <span className="pe-savebar-dot" aria-hidden="true"></span>
              You have unsaved changes
            </>
          )}
          {!saveError && !saving && !dirty && justSaved && (
            <>
              <FiCheck />
              {connected
                ? 'Saved. The website now shows these changes.'
                : 'Saved. Changes go live once the website is connected to the backend.'}
            </>
          )}
          {!saveError && !saving && !dirty && !justSaved && loadError && (
            <>
              <FiAlertCircle />
              Could not load the saved content, so the default content is shown.
            </>
          )}
          {!saveError && !saving && !dirty && !justSaved && !loadError && (
            <>
              <FiCheck />
              All changes saved
            </>
          )}
        </span>

        <div className="pe-savebar-actions">
          <button
            type="button"
            className="pe-btn outline"
            disabled={!dirty || saving}
            onClick={discard}
          >
            <FiRotateCcw />
            Discard
          </button>
          <button
            type="button"
            className="pe-btn primary"
            disabled={!dirty || saving}
            onClick={save}
          >
            <FiSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageEditorLayout
