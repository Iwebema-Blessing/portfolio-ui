import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/Spinner';

/** Keeps the admin area behind a sign in. */
export const ProtectedRoute = ({ children }) => {
  const { isSignedIn, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner label="Checking your session" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/account" state={{ from: location.pathname }} replace />;
  }

  return children;
};
