// TODO: replace with data from the backend. Sample figures for layout only.

export const stats = [
  { key: 'inquiries', label: 'New inquiries', value: '45', change: '+18%', note: 'vs last month', trend: 'up' },
  { key: 'intake', label: 'Intake forms', value: '16', change: '+4', note: 'this month', trend: 'up' },
  { key: 'revenue', label: 'Revenue', value: '$42,500', change: '+12%', note: 'vs last month', trend: 'up' },
  { key: 'events', label: 'Event registrations', value: '64', change: '-6%', note: 'vs last month', trend: 'down' },
]

// inquiries received per month
export const monthlyInquiries = [
  { month: 'Apr', value: 18 },
  { month: 'May', value: 24 },
  { month: 'Jun', value: 21 },
  { month: 'Jul', value: 32 },
  { month: 'Aug', value: 38 },
  { month: 'Sep', value: 45 },
]

// packages sold this year (names match the website's Packages page)
export const packageSales = [
  { name: 'Executive Discovery Sessions', sold: 22 },
  { name: 'Market Entry Blueprint', sold: 14 },
  { name: 'Executive Advisory Retainer', sold: 9 },
  { name: 'Qatar Incorporation & Bank Readiness Pathway', sold: 6 },
  { name: 'Operational Readiness Program', sold: 2 },
]

export const recentInquiries = [
  { id: 1, name: 'Amara Okafor', company: 'Lagos Ventures', interest: 'Market Entry Blueprint', date: 'Oct 1, 2026', status: 'New' },
  { id: 2, name: 'Kofi Mensah', company: 'Accra Agritech', interest: 'Qatar Incorporation', date: 'Sep 30, 2026', status: 'New' },
  { id: 3, name: 'Marcus Reed', company: 'Reed Capital', interest: 'Advisory Retainer', date: 'Sep 29, 2026', status: 'Contacted' },
  { id: 4, name: 'Fatima Benali', company: 'Casablanca Health', interest: 'KYC Readiness Review', date: 'Sep 28, 2026', status: 'In review' },
  { id: 5, name: 'Jordan Ellis', company: 'Ellis Logistics', interest: 'Discovery Session', date: 'Sep 26, 2026', status: 'Closed' },
]

// matches the sample events on the website's Events page
export const upcomingEvents = [
  { id: 1, title: 'Market entry into Qatar: a briefing for U.S. founders', format: 'Webinar', date: '2026-11-12', time: '11:00 AM EST', location: 'Online', registered: 38 },
  { id: 2, title: 'Integra Nights: Doha', format: 'Integra Nights', date: '2026-11-26', time: '7:00 PM AST', location: 'Doha, Qatar', registered: 19 },
  { id: 3, title: 'Regulatory and KYC readiness: sector briefing', format: 'Sector Briefing', date: '2026-12-10', time: '12:00 PM AST', location: 'Online', registered: 7 },
]
