import { createContext, useEffect, useState } from 'react'
import siteConfig from '../constants/siteConfig.js'
import { getPage } from '../services/pages.js'

// Settings saved in the admin (Settings) over the values in siteConfig.js.
// Only the parts the admin edits are replaced; everything else (Stripe
// payments, Brevo hidden fields, hero video) still comes from siteConfig.js.
const mergeSettings = (base, saved) => {
  if (!saved) return base
  const forms = saved.googleForms || {}

  const form = (name) => ({
    ...base.googleForms[name],
    ...(forms[name] || {}),
    fields: { ...base.googleForms[name].fields, ...(forms[name]?.fields || {}) },
  })

  return {
    ...base,
    contact: { ...base.contact, ...saved.contact },
    whatsapp: { ...base.whatsapp, ...saved.whatsapp },
    social: { ...base.social, ...saved.social },
    booking: { ...base.booking, ...saved.booking },
    googleForms: {
      ...base.googleForms,
      contact: form('contact'),
      intake: form('intake'),
      events: { ...base.googleForms.events, ...(forms.events || {}) },
    },
    documentUpload: { ...base.documentUpload, ...saved.documentUpload },
    mailingList: { ...base.mailingList, ...saved.mailingList },
    deposit: { ...base.deposit, ...saved.deposit },
    budgetRanges: saved.intake?.budgetRanges ?? base.budgetRanges,
  }
}

export const SiteConfigContext = createContext(siteConfig)

// Starts with siteConfig.js so the site renders straight away, then swaps in
// the admin's settings. If the backend cannot be reached, siteConfig.js stays.
export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(siteConfig)

  useEffect(() => {
    let active = true

    getPage('settings')
      .then((result) => {
        if (active && result?.content) setConfig(mergeSettings(siteConfig, result.content))
      })
      .catch(() => {
        // keep siteConfig.js
      })

    return () => {
      active = false
    }
  }, [])

  return <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>
}
