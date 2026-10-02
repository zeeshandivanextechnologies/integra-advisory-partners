import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.jsx'
import Router from './routes/Router.jsx'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        newestOnTop
      />
    </AuthProvider>
  )
}

export default App