import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import Home from '../pages/Home.jsx'
import Services from '../pages/Services.jsx'
import Packages from '../pages/Packages.jsx'
import Process from '../pages/Process.jsx'
import Insights from '../pages/Insights.jsx'
import Events from '../pages/Events.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import Intake from '../pages/Intake.jsx'
import NotFound from '../pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'packages', element: <Packages /> },
      { path: 'process', element: <Process /> },
      { path: 'insights', element: <Insights /> },
      { path: 'events', element: <Events /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'intake', element: <Intake /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
