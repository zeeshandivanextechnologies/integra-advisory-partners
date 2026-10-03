import {
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiEdit3,
  FiFileText,
  FiGrid,
  FiHome,
  FiInfo,
  FiLayers,
  FiLayout,
  FiList,
  FiMonitor,
  FiSettings,
  FiTag,
} from 'react-icons/fi'

// Sidebar menu. An item with `children` is a group that opens a submenu.
export const navMenu = [
  { label: 'Dashboard', to: '/', icon: FiGrid },
  {
    label: 'Website Pages',
    icon: FiLayout,
    children: [
      { label: 'Home Page', to: '/pages/home', icon: FiHome },
      { label: 'About Page', to: '/pages/about', icon: FiInfo },
      { label: 'Services Page', to: '/pages/services', icon: FiLayers },
      { label: 'Packages Page', to: '/pages/packages', icon: FiTag },
      { label: 'Process Page', to: '/pages/process', icon: FiList },
      { label: 'Insights Page', to: '/pages/insights', icon: FiBookOpen },
      { label: 'Events Page', to: '/pages/events', icon: FiMonitor },
      { label: 'Deposit Page', to: '/pages/deposit', icon: FiDollarSign },
      { label: 'Payment Success Page', to: '/pages/payment-success', icon: FiCheckCircle },
    ],
  },
  {
    label: 'Content',
    icon: FiEdit3,
    children: [
      { label: 'Articles', to: '/articles', icon: FiFileText },
      { label: 'Events', to: '/events', icon: FiCalendar },
      { label: 'Privacy Policy', to: '/pages/privacy-policy', icon: FiFileText },
      { label: 'Terms & Conditions', to: '/pages/terms-and-conditions', icon: FiFileText },
      // add FiInbox / FiCreditCard to the import above before turning these on
      // { label: 'Inquiries', to: '/inquiries', icon: FiInbox },
      // { label: 'Payments', to: '/payments', icon: FiCreditCard },
    ],
  },
  { label: 'Settings', to: '/settings', icon: FiSettings },
]

// Every page link in one flat list, in menu order; the header reads this to
// show the current page title
const navLinks = navMenu.flatMap((item) => item.children || [item])

export default navLinks
