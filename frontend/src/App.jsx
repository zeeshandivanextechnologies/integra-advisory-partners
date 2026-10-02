import { SiteConfigProvider } from './context/SiteConfigContext.jsx'
import Router from './routes/Router.jsx'

function App() {
  return (
    // site-wide links and contact details from the admin (Settings)
    <SiteConfigProvider>
      <Router />
    </SiteConfigProvider>
  )
}

export default App
