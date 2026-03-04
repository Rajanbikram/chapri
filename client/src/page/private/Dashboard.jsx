import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight:"100vh", background:"#f4f6fb", fontFamily:"'Segoe UI', Arial, sans-serif" }}>
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 40px", background:"#fff", boxShadow:"0 1px 6px rgba(0,0,0,.09)" }}>
        <span style={{ fontWeight:700, fontSize:"1.15rem" }}>✈️ SkyHigh Travels</span>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:".9rem", color:"#555" }}>Hello, <b>{user?.name}</b></span>
          <button onClick={() => { logout(); navigate("/"); }} style={{ padding:"8px 18px", border:"none", borderRadius:6, background:"#e53e3e", color:"#fff", cursor:"pointer", fontSize:".88rem", fontWeight:600 }}>Logout</button>
        </div>
      </nav>
      <div style={{ maxWidth:700, margin:"60px auto", padding:"0 20px" }}>
        <div style={{ background:"#fff", borderRadius:14, padding:36, boxShadow:"0 4px 20px rgba(0,0,0,.07)" }}>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, marginBottom:8 }}>Welcome back, {user?.name}! ✈️</h1>
          <p style={{ color:"#888", marginBottom:24 }}>You are successfully logged in.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[["Email", user?.email], ["Role", user?.role], ["User ID", `#${user?.id}`]].map(([k,v]) => (
              <div key={k} style={{ background:"#f4f6fb", borderRadius:10, padding:"16px 20px" }}>
                <div style={{ fontSize:".75rem", fontWeight:700, color:"#999", textTransform:"uppercase", letterSpacing:".07em", marginBottom:4 }}>{k}</div>
                <div style={{ fontSize:".95rem", fontWeight:600, color:"#333" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;