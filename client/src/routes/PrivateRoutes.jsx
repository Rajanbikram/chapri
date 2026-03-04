import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // Role check — wrong dashboard ma gayo bhane redirect
  if (role === "airline_owner" && user.role !== "airline_owner") return <Navigate to="/dashboard" />;
  if (role === "traveler" && user.role !== "traveler") return <Navigate to="/owner-dashboard" />;

  return children;
};

export default PrivateRoute;