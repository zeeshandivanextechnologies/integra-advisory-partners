import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'

const Home = lazy(() => import('../pages/Home.jsx'))
const Services = lazy(() => import('../pages/Services.jsx'))
const Packages = lazy(() => import('../pages/Packages.jsx'))
const Process = lazy(() => import('../pages/Process.jsx'))
const Insights = lazy(() => import('../pages/Insights.jsx'))
const Article = lazy(() => import('../pages/Article.jsx'))
const Events = lazy(() => import('../pages/Events.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))
const Intake = lazy(() => import('../pages/Intake.jsx'))
const Deposit = lazy(() => import('../pages/Deposit.jsx'))
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess.jsx'))
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy.jsx'))
const TermsConditions = lazy(() => import('../pages/TermsConditions.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

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
      { path: 'insights/:slug', element: <Article /> },
      { path: 'events', element: <Events /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'intake', element: <Intake /> },
      { path: 'deposit', element: <Deposit /> },
      { path: 'payment-success', element: <PaymentSuccess /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-and-conditions', element: <TermsConditions /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
