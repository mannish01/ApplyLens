import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingState from './components/shared/LoadingState';

const Explore = lazy(() => import('./pages/Explore'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProfileForm = lazy(() => import('./pages/ProfileForm'));
const SavedOpportunities = lazy(() => import('./pages/SavedOpportunities'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Routes>
        {/* Public routes */}
        <Route path="/explore" element={<Explore />} />

        {/* Guest-only routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/setup" element={<ProfileForm />} />
          <Route path="/saved-opportunities" element={<SavedOpportunities />} />
        </Route>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/explore" replace />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
