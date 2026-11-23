import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Wait until authentication is checked
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // If not logged in, redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access
  return <Outlet />;
};

export default ProtectedRoute;