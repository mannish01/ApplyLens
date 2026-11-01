import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function GuestRoute() {
  const { isAuthenticated, isLoading, authError } = useAuth();

  if (isLoading) {
    return <div>Checking session...</div>;
  }

  if (authError) {
    return <div>{authError}</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
