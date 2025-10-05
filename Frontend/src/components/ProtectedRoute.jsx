// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading } = useAuth();

  // Wait until auth context finishes loading
  if (loading) return <p className="p-6">Loading...</p>;

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role check: only redirect if role exists and user.role is defined
  if (role && user?.role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
