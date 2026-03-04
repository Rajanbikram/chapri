import { Routes, Route } from "react-router-dom";
import LandingPage from "../page/public/LandingPage";
import Login from "../page/public/auth/Login";
import Register from "../page/public/auth/Register";
import Dashboard from "../page/private/Dashboard";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;