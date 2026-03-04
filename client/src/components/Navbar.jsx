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
      padding: "14px 40px", background: "#fff",
      boxShadow: "0 1px 6px rgba(0,0,0,.09)",
      position: "sticky", top: 0, zIndex: 100,
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      {/* LOGO */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, fontSize: "1.15rem", fontWeight: 700, color: "#111", textDecoration: "none" }}>
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path d="M20 7C12 13 3 15 3 15s9 3 13 9c2-7 9-11 21-13C31 9 26 5 20 7z" fill="#1d6af4"/>
          <path d="M20 21c0 5-4 9-9 11 5-1 11-4 13-11z" fill="#1d6af4" opacity=".45"/>
        </svg>
        SkyHigh Travels
      </a>

      {/* NAV LINKS */}
      <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
        {["Explore", "My Bookings", "For Airlines", "Support"].map(item => (
          <li key={item}>
            <a href="#" style={{ textDecoration: "none", color: "#444", fontSize: ".92rem", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#1d6af4"}
              onMouseLeave={e => e.target.style.color = "#444"}>
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* AUTH BUTTONS */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user ? (
          <>
            <span style={{ fontSize: ".88rem", color: "#555" }}>Hello, <b>{user.name}</b></span>
            <button
              onClick={handleLogout}
              style={{ padding: "8px 18px", border: "none", borderRadius: 6, background: "#e53e3e", color: "#fff", cursor: "pointer", fontSize: ".88rem", fontWeight: 600 }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{ padding: "8px 18px", border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: ".88rem" }}>
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{ padding: "8px 18px", border: "none", borderRadius: 6, background: "#1d6af4", color: "#fff", cursor: "pointer", fontSize: ".88rem", fontWeight: 600 }}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;