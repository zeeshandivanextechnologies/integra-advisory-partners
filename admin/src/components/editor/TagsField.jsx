import { useState } from 'react'
import { FiX } from 'react-icons/fi'

// A list of short words. Enter or comma adds the typed word,
// Backspace on an empty box removes the last one.
function TagsField({ id, label, values, onChange, placeholder, hint }) {
  const [draft, setDraft] = useState('')

  const addDraft = () => {
    const value = draft.trim()
    if (value && !values.includes(value)) onChange([...values, value])
    setDraft('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addDraft()
    } else if (event.key === 'Backspace' && !draft && values.length > 0) {
      onChange(values.slice(0, -1))
    }
  }

  return (
    <div className="custom-frm-bx pe-field">
      <label htmlFor={id}>{label}</label>

      <div className="pe-tags">
        {values.map((value) => (
          <span className="pe-tag" key={value}>
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              <FiX />
            </button>
          </span>
        ))}

        <input
          id={id}
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addDraft}
        />
      </div>

      {hint && <p className="pe-hint">{hint}</p>}
    </div>
  )
}

export default TagsField
