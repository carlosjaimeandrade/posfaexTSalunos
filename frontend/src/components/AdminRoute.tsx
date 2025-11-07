import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isAdmin } = useAuth()
  const loc = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc }} />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
