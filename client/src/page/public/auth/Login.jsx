import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "center",
      background: "#e8edf5",
      fontFamily: "'Segoe UI', Arial, sans-serif",
    }}>

      {/* ← BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.9)", border: "1px solid #ddd",
          borderRadius: 8, padding: "8px 16px",
          fontSize: 14, fontWeight: 600, color: "#333",
          cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "#fff"}
        onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
      >
        ← Back
      </button>

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%", maxWidth: isMobile ? "100%" : 900,
        minHeight: isMobile ? "100vh" : 580,
        borderRadius: isMobile ? 0 : 18,
        overflow: "hidden",
        boxShadow: isMobile ? "none" : "0 20px 60px rgba(0,0,0,.22)"
      }}>

        {/* TOP / LEFT — hero image */}
        <div style={{
          position: "relative",
          width: isMobile ? "100%" : "44%",
          height: isMobile ? 220 : "auto",
          flexShrink: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "20px 24px" : 36,
          color: "#fff", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80')",
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "brightness(.7)"
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,40,110,.7) 0%, transparent 60%)" }} />

          {/* Logo */}
          <div style={{ position: "absolute", top: 20, left: 24, display: "flex", alignItems: "center", gap: 9, fontWeight: 700, color: "#fff", zIndex: 1 }}>
            <div style={{ width: 34, height: 34, background: "rgba(255,255,255,.18)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,.3)" }}>
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 1 16.5 2.5L13 6 4.8 4.2l-1.5 1.5L9 8.5 6 11.5l-2-.5L2.5 12.5l3 1.5 1.5 3 1.5-1.5-.5-2 3-3 2.5 5.5 1.5-1.5z"/></svg>
            </div>
            SkyBound
          </div>

          {!isMobile && (
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, lineHeight: 1.2, marginBottom: 10 }}>Elevate your travel<br/>experience.</h2>
              <p style={{ fontSize: ".87rem", color: "rgba(255,255,255,.8)", lineHeight: 1.65 }}>Manage bookings, monitor flights in real-time, and access exclusive airline partner tools.</p>
            </div>
          )}

          {isMobile && (
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>Elevate your travel experience.</h2>
            </div>
          )}

          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", fontSize: ".7rem", color: "rgba(255,255,255,.45)", zIndex: 1 }}>
            {!isMobile && "© 2024 SkyBound Aviation Systems."}
          </div>
        </div>

        {/* BOTTOM / RIGHT — form */}
        <div style={{
          flex: 1, background: "#fff",
          padding: isMobile ? "28px 24px 40px" : "44px 44px 36px",
          display: "flex", flexDirection: "column", justifyContent: "center"
        }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111", marginBottom: 4 }}>Welcome Back</h1>
          <p style={{ fontSize: ".87rem", color: "#888", marginBottom: 22 }}>Enter your credentials to access your flights and bookings.</p>

          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #fc8181", color: "#c53030", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: ".87rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#444", marginBottom: 6 }}>Email Address</label>
            <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1.5px solid #ddd", borderRadius: 9, padding: "11px 14px", marginBottom: 14 }}>
              <svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" name="email" placeholder="e.g. name@airline.com"
                value={form.email} onChange={handleChange} required
                style={{ border: "none", outline: "none", fontSize: ".9rem", color: "#333", width: "100%", background: "transparent" }} />
            </div>

            <label style={{ display: "block", fontSize: ".8rem", fontWeight: 600, color: "#444", marginBottom: 6 }}>Password</label>
            <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1.5px solid #ddd", borderRadius: 9, padding: "11px 14px", marginBottom: 12 }}>
              <svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input type={showPw ? "text" : "password"} name="password" placeholder="Enter your password"
                value={form.password} onChange={handleChange} required
                style={{ border: "none", outline: "none", fontSize: ".9rem", color: "#333", width: "100%", background: "transparent" }} />
              <span onClick={() => setShowPw(!showPw)} style={{ cursor: "pointer", color: "#aaa" }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".83rem", color: "#666" }}>
                <input type="checkbox" style={{ accentColor: "#1d6af4" }} /> Remember me
              </label>
              <a href="#" style={{ fontSize: ".83rem", color: "#1d6af4", textDecoration: "none", fontWeight: 600 }}>Forgot Password?</a>
            </div>

            <button type="submit" disabled={loading} style={{
              width: "100%", padding: 14,
              background: loading ? "#93b4f8" : "#1d6af4",
              color: "#fff", border: "none", borderRadius: 9,
              fontSize: ".97rem", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: ".85rem", color: "#888", marginTop: 16 }}>
            New here? <span onClick={() => navigate("/register")} style={{ color: "#1d6af4", fontWeight: 700, cursor: "pointer" }}>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;