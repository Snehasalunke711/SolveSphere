
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return (
      <Navigate
        to={user.role === "owner" ? "/owner-dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
