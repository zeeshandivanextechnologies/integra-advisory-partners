// options: [{ value, label }]
function SelectField({ id, label, value, onChange, options, hint }) {
  return (
    <div className="custom-frm-bx pe-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="pe-hint">{hint}</p>}
    </div>
  )
}

export default SelectField
