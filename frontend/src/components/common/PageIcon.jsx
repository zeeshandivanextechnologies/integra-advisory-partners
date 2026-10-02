import { createElement } from 'react'
import { FiCheck } from 'react-icons/fi'
import icons from '../../constants/icons.js'

// An icon picked in the admin and saved by name, e.g. "FiFlag"
function PageIcon({ name }) {
  return createElement(icons[name] || FiCheck)
}

export default PageIcon
