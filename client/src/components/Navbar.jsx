import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", background: "#fff",
      boxShadow: "0 1px 6px rgba(0,0,0,.09)",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      fontFamily: "'Segoe UI', Arial, sans-serif",
      minHeight: 52,
    }}>
      {/* LOGO */}
      <a href="/" style={{
        display: "flex", alignItems: "center", gap: 7,
        fontSize: ".95rem", fontWeight: 700, color: "#111",
        textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap"
      }}>
        <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
          <path d="M20 7C12 13 3 15 3 15s9 3 13 9c2-7 9-11 21-13C31 9 26 5 20 7z" fill="#1d6af4"/>
          <path d="M20 21c0 5-4 9-9 11 5-1 11-4 13-11z" fill="#1d6af4" opacity=".45"/>
        </svg>
        SkyHigh Travels
      </a>

      {/* AUTH */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        {user ? (
          <>
            <span style={{ fontSize: ".82rem", color: "#555", whiteSpace: "nowrap" }}>
              Hello, <b>{user.name}</b>
            </span>
            <button onClick={handleLogout}
              style={{ padding: "6px 12px", border: "none", borderRadius: 6, background: "#e53e3e", color: "#fff", cursor: "pointer", fontSize: ".82rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}
              style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: ".82rem", whiteSpace: "nowrap" }}>
              Login
            </button>
            <button onClick={() => navigate("/register")}
              style={{ padding: "6px 12px", border: "none", borderRadius: 6, background: "#1d6af4", color: "#fff", cursor: "pointer", fontSize: ".82rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;