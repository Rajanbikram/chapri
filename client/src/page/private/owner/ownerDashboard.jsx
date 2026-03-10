import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../../css/owner.css";

const menuItems = [
  { key: "", label: "Dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
  { key: "add-flight", label: "Add New Flight", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 4l-1.5 6.5L16 12l-3 6-2.5 1.5"/></svg> },
  { key: "update-schedule", label: "Update Schedule", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg> },
  { key: "pricing", label: "Ticket Pricing", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/></svg> },
  { key: "seats", label: "Seat Availability", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/></svg> },
  { key: "bookings", label: "Passenger Bookings", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
  { key: "cancellation", label: "Cancellation / Delay", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg> },
  { key: "users", label: "User Accounts", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
];

const sectionTitles = {
  "": "Dashboard Overview",
  "add-flight": "Add New Flight",
  "update-schedule": "Update Flight Schedule",
  pricing: "Ticket Pricing Management",
  seats: "Seat Availability",
  bookings: "Passenger Bookings",
  cancellation: "Flight Cancellation / Delay",
  users: "User Account Management",
};

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const currentKey = location.pathname.replace("/owner-dashboard/", "").replace("/owner-dashboard", "");

  // Back button disable — logout nagari dashboard bata najaos
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePop = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const goTo = (key) => {
    navigate(key ? `/owner-dashboard/${key}` : "/owner-dashboard");
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 4l-1.5 6.5L16 12l-3 6-2.5 1.5"/></svg>
          <span>VAYU</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={currentKey === item.key ? "active" : ""}
              onClick={() => goTo(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">Vayu Airlines © 2026</div>
      </aside>

      {/* MAIN */}
      <div className="main-wrap">
        <header className="header">
          <h1>{sectionTitles[currentKey] || "Dashboard Overview"}</h1>
          <div className="header-right">
            <div className="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" placeholder="Search flights, passengers..." />
            </div>
            <button className="bell-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="bell-dot"></span>
            </button>
            <div style={{ position: "relative" }}>
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="avatar">AO</div>
                {/* ✅ Name hatayo — sirf role dekhauxa */}
                <div><div className="profile-role">Airline Owner</div></div>
              </button>
              {profileOpen && (
                <div className="profile-dropdown show">
                  <button onClick={() => setProfileOpen(false)}>Profile Settings</button>
                  <button onClick={() => setProfileOpen(false)}>Help & Support</button>
                  <hr />
                  <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <div className="section">
            <Outlet context={{ showToast }} />
          </div>
        </main>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default OwnerDashboard;