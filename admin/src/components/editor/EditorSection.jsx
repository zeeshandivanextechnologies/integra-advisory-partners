import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

// One section of a website page, shown as a collapsible card.
// Pass onToggleVisible to show the Visible / Hidden switch.
function EditorSection({
  id,
  number,
  icon: Icon,
  title,
  description,
  visible = true,
  onToggleVisible,
  children,
}) {
  const [open, setOpen] = useState(true)
  const bodyId = `${id}-body`

  return (
    <section id={id} className={`pe-section ${visible ? '' : 'is-hidden'}`}>
      <div className="pe-section-head">
        <span className="pe-section-icon">
          <Icon />
        </span>

        <div className="pe-section-info">
          <span className="pe-section-number">
            Section {String(number).padStart(2, '0')}
          </span>
          <h3 className="pe-section-title">{title}</h3>
          {description && <p className="pe-section-text">{description}</p>}
        </div>

        <div className="pe-section-actions">
          {onToggleVisible && (
            <label className="pe-switch">
              <input
                type="checkbox"
                checked={visible}
                onChange={(event) => onToggleVisible(event.target.checked)}
              />
              <span className="pe-switch-track" aria-hidden="true"></span>
              <span className="pe-switch-label">
                {visible ? 'Visible' : 'Hidden'}
              </span>
            </label>
          )}

          <button
            type="button"
            className={`pe-collapse ${open ? 'open' : ''}`}
            aria-expanded={open}
            aria-controls={bodyId}
            aria-label={`${open ? 'Collapse' : 'Expand'} ${title}`}
            onClick={() => setOpen((value) => !value)}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>

      {open && (
        <div className="pe-section-body" id={bodyId}>
          {children}
        </div>
      )}
    </section>
  )
}

export default EditorSection
