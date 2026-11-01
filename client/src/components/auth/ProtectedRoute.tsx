import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '../../context/AuthContext';
import LoadingState from '../shared/LoadingState';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
