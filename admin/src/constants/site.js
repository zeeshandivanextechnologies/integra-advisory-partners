// The public website, for "View on Website" links and previews of its images.
// Set VITE_WEBSITE_URL for the live site (e.g. https://integraadvisorypartners.com).
export const websiteUrl = (import.meta.env.VITE_WEBSITE_URL || 'http://localhost:5173').replace(
  /\/$/,
  '',
)

// website pages a button on the site can link to
export const sitePages = [
  { value: '/', label: 'Home' },
  { value: '/about', label: 'About' },
  { value: '/services', label: 'Services' },
  { value: '/packages', label: 'Packages' },
  { value: '/process', label: 'Process' },
  { value: '/insights', label: 'Insights' },
  { value: '/events', label: 'Events' },
  { value: '/contact', label: 'Contact' },
  { value: '/intake', label: 'Market Entry Review (intake form)' },
  { value: '/deposit', label: 'Pay Your Deposit' },
  { value: '/privacy-policy', label: 'Privacy Policy' },
  { value: '/terms-and-conditions', label: 'Terms & Conditions' },
]
