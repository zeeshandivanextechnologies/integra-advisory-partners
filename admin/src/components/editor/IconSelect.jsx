import icons from '../../constants/icons.js'

// "FiAlertTriangle" -> "Alert Triangle"
const iconName = (key) =>
  key.replace(/^Fi/, '').replace(/([a-z])([A-Z])/g, '$1 $2')

function IconSelect({ id, label = 'Icon', value, onChange }) {
  const Icon = icons[value]

  return (
    <div className="custom-frm-bx pe-field">
      <label htmlFor={id}>{label}</label>
      <div className="pe-icon-select">
        <span className="pe-icon-preview" aria-hidden="true">
          {Icon && <Icon />}
        </span>
        <select
          id={id}
          className="form-select"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {Object.keys(icons).map((key) => (
            <option key={key} value={key}>
              {iconName(key)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default IconSelect
