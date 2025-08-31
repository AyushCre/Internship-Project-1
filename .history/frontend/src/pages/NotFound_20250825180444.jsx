import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you’re looking for does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

