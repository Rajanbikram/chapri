import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../services/auth/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMe()
        .then((data) => setUser(data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);

    // Role based redirect
    if (data.user.role === "airline_owner") {
      navigate("/owner-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);