import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getMyBookings } from "../../../services/traveller/bookingService";
import "../../../css/traveller.css";

const sidebarItems = [
  { key: "", icon: "📊", label: "Overview" },
  { key: "search", icon: "🔍", label: "Flight Search" },
  { key: "availability", icon: "💺", label: "Seat Availability" },
  { key: "filter", icon: "⚙", label: "Filter Flights" },
  { key: "details", icon: "📋", label: "Flight Details" },
  { key: "seats", icon: "🪑", label: "Seat Selection" },
  { key: "payment", icon: "💳", label: "Payment" },
  { key: "confirmation", icon: "✅", label: "Booking Confirmation" },
  { key: "manage", icon: "📁", label: "Manage Bookings" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Back button disable — logout nagari dashboard bata najaos
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePop = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    getMyBookings()
      .then((data) => setBookings(data.bookings || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const upcoming = bookings.filter((b) => b.status === "Confirmed").length;
  const stats = [
    { label: "Total Bookings",  value: bookings.length,                icon: "✈", change: `+${bookings.length} total` },
    { label: "Upcoming Flights", value: upcoming,                      icon: "📅", change: upcoming > 0 ? "Confirmed bookings" : "No upcoming" },
    { label: "Total Spent",      value: `₹${totalSpent.toLocaleString()}`, icon: "💳", change: bookings.length > 0 ? `Avg ₹${Math.round(totalSpent / bookings.length).toLocaleString()}` : "₹0" },
    { label: "Miles Earned",     value: (bookings.length * 350).toLocaleString(), icon: "🕐", change: `+${bookings.length * 350} total` },
  ];
  const recentBookings = bookings.slice(0, 5);
  const goTo = (key) => navigate(`/dashboard/${key}`);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true }); // replace:true — logout garesi back thichda dashboard naauxa
  };

  return (
    <div>
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">✈</div>
          <span>Vayu</span>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button key={item.key} onClick={() => goTo(item.key)}>
              <span className="icon">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><p>© 2026 Vayu Airways</p></div>
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="header">
          <div className="header-left">
            <h2>Traveller Dashboard</h2>
            <p>Welcome back</p>
          </div>
          <div className="header-right">
            <button className="header-bell">🔔<span className="dot"></span></button>
            <div style={{ position: "relative" }}>
              <button className="header-profile" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="header-avatar">A</div>
                ▾
              </button>
              {profileOpen && (
                <div className="profile-dropdown open">
                  <button onClick={() => setProfileOpen(false)}>My Profile</button>
                  <button onClick={() => setProfileOpen(false)}>Settings</button>
                  <button onClick={() => { setProfileOpen(false); handleLogout(); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="section">
            <Outlet context={{ stats, recentBookings, loading }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;