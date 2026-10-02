import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import HomePage from '../pages/HomePage.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import ServicesPage from '../pages/ServicesPage.jsx'
import PackagesPage from '../pages/PackagesPage.jsx'
import ProcessPage from '../pages/ProcessPage.jsx'
import InsightsPage from '../pages/InsightsPage.jsx'
import ArticlesList from '../pages/ArticlesList.jsx'
import EventsPage from '../pages/EventsPage.jsx'
import EventsList from '../pages/EventsList.jsx'
import EventEditor from '../pages/EventEditor.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import DepositPage from '../pages/DepositPage.jsx'
import PaymentSuccessPage from '../pages/PaymentSuccessPage.jsx'
import NotificationsPage from '../pages/NotificationsPage.jsx'
import ArticleEditor from '../pages/ArticleEditor.jsx'
import Login from '../pages/Login.jsx'

// Placeholder screens until the real pages are added in src/pages
const Placeholder = ({ title }) => <h2>{title}</h2>

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'pages/home', element: <HomePage /> },
      { path: 'pages/about', element: <AboutPage /> },
      { path: 'pages/services', element: <ServicesPage /> },
      { path: 'pages/packages', element: <PackagesPage /> },
      { path: 'pages/process', element: <ProcessPage /> },
      { path: 'pages/insights', element: <InsightsPage /> },
      { path: 'pages/events', element: <EventsPage /> },
      { path: 'pages/deposit', element: <DepositPage /> },
      { path: 'pages/payment-success', element: <PaymentSuccessPage /> },
      { path: 'articles', element: <ArticlesList /> },
      { path: 'articles/new', element: <ArticleEditor /> },
      { path: 'articles/:id', element: <ArticleEditor /> },
      { path: 'events', element: <EventsList /> },
      { path: 'events/new', element: <EventEditor /> },
      { path: 'events/:id', element: <EventEditor /> },
      { path: 'packages', element: <Placeholder title="Packages" /> },
      { path: 'inquiries', element: <Placeholder title="Inquiries" /> },
      { path: 'payments', element: <Placeholder title="Payments" /> },
      { path: 'settings', element: <SettingsPage /> },
      // the profile lives at the top of Settings
      { path: 'profile', element: <Navigate to="/settings" replace /> },
      { path: 'notifications', element: <NotificationsPage /> },
    ],
  },
  { path: '*', element: <Placeholder title="Page not found" /> },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router
