// Text input or textarea. maxLength is a soft limit: the counter turns red
// when it is passed, but typing is not blocked.
function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  placeholder,
  maxLength,
  multiline = false,
  rows = 3,
}) {
  const over = maxLength && value.length > maxLength

  return (
    <div className="custom-frm-bx pe-field">
      <div className="pe-field-top">
        <label htmlFor={id}>{label}</label>
        {maxLength && (
          <span className={`pe-count ${over ? 'over' : ''}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {multiline ? (
        <textarea
          id={id}
          className="form-control"
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        ></textarea>
      ) : (
        <input
          id={id}
          type="text"
          className="form-control"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {hint && <p className="pe-hint">{hint}</p>}
    </div>
  )
}

export default TextField
