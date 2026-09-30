import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from '../common/WhatsAppButton.jsx'

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollRestoration />
    </div>
  )
}

export default Layout
