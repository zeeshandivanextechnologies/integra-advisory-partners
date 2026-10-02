import { useContext } from 'react'
import { SiteConfigContext } from '../context/SiteConfigContext.jsx'

// Site-wide links and contact details: siteConfig.js with the admin's
// Settings applied on top. Same shape as siteConfig.js.
function useSiteConfig() {
  return useContext(SiteConfigContext)
}

export default useSiteConfig
