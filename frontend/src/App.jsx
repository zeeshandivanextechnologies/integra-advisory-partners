import { ToastContainer } from 'react-toastify'
import { SiteConfigProvider } from './context/SiteConfigContext.jsx'
import Router from './routes/Router.jsx'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    // site-wide links and contact details from the admin (Settings)
    <SiteConfigProvider>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        newestOnTop
      />
    </SiteConfigProvider>
  )
}

export default App
