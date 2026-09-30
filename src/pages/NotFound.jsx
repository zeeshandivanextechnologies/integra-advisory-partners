import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta.js'

function NotFound() {
  usePageMeta(
    'Page Not Found',
    'The page you are looking for could not be found.',
  )

  return (
    <div className="container text-center py-5">
      <h1>404</h1>
      <p>Page not found</p>
      <Link className="btn btn-primary" to="/">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
