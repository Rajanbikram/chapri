import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/auth/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"", role:"traveler" });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (!agree) return setError("Please accept the Terms of Service.");
    setLoading(true);
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password, role: form.role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const iw = { display:"flex", alignItems:"center", gap:9, border:"1.5px solid #ddd", borderRadius:9, padding:"10px 14px" };
  const inp = { border:"none", outline:"none", fontSize:".9rem", color:"#333", width:"100%", background:"transparent" };
  const lbl = { display:"block", fontSize:".8rem", fontWeight:600, color:"#444", marginBottom:6, marginTop:14 };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#e8edf5", fontFamily:"'Segoe UI', Arial, sans-serif" }}>
      <div style={{ display:"flex", width:900, maxWidth:"98vw", minHeight:580, borderRadius:18, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,.22)" }}>
        {/* LEFT */}
        <div style={{ position:"relative", width:"44%", flexShrink:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:36, color:"#fff", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80')", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(.65)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,40,110,.7) 0%, transparent 60%)" }} />
          <div style={{ position:"absolute", top:28, left:28, display:"flex", alignItems:"center", gap:9, fontWeight:700, color:"#fff", zIndex:1 }}>
            <div style={{ width:34, height:34, background:"rgba(255,255,255,.18)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,.3)" }}>
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 1 16.5 2.5L13 6 4.8 4.2l-1.5 1.5L9 8.5 6 11.5l-2-.5L2.5 12.5l3 1.5 1.5 3 1.5-1.5-.5-2 3-3 2.5 5.5 1.5-1.5z"/></svg>
            </div>
            SkyBound
          </div>
          <div style={{ position:"relative", zIndex:1 }}>
            <h2 style={{ fontSize:"1.85rem", fontWeight:800, lineHeight:1.2, marginBottom:10 }}>Start your journey<br/>with us today.</h2>
            <p style={{ fontSize:".87rem", color:"rgba(255,255,255,.8)", lineHeight:1.65, marginBottom:28 }}>Join a global community of over 2 million travelers and aviation professionals.</p>
            <div style={{ display:"flex", gap:28 }}>
              {[["150+","Countries"],["2.4k","Airlines"],["12M","Bookings"]].map(([n,l]) => (
                <div key={l}><div style={{ fontSize:"1.3rem", fontWeight:800 }}>{n}</div><div style={{ fontSize:".72rem", color:"rgba(255,255,255,.65)", marginTop:2 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ position:"absolute", bottom:16, left:0, right:0, textAlign:"center", fontSize:".7rem", color:"rgba(255,255,255,.45)", zIndex:1 }}>© 2024 SkyBound Aviation Systems.</div>
        </div>

        {/* RIGHT */}
        <div style={{ flex:1, background:"#fff", padding:"36px 44px", display:"flex", flexDirection:"column", justifyContent:"center", overflowY:"auto" }}>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#111", marginBottom:4 }}>Create your account</h1>
          <p style={{ fontSize:".87rem", color:"#888", marginBottom:12 }}>Join our community of travelers and aviation experts.</p>

          {/* ROLE TOGGLE */}
          <div style={{ display:"flex", border:"1.5px solid #ddd", borderRadius:9, overflow:"hidden", marginBottom:8 }}>
            {[["traveler","Traveler"],["airline_owner","Airline Owner"]].map(([val,label]) => (
              <button key={val} onClick={() => setForm({...form, role:val})} style={{ flex:1, padding:"9px 10px", border:"none", background: form.role===val ? "#1d6af4" : "#fff", color: form.role===val ? "#fff" : "#777", cursor:"pointer", fontSize:".87rem", fontWeight: form.role===val ? 600 : 400 }}>
                {label}
              </button>
            ))}
          </div>

          {error && <div style={{ background:"#fff5f5", border:"1px solid #fc8181", color:"#c53030", padding:"10px 14px", borderRadius:8, marginBottom:10, fontSize:".87rem" }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={lbl}>Full Name</label>
            <div style={iw}><svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg><input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required style={inp}/></div>

            <label style={lbl}>Email Address</label>
            <div style={iw}><svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required style={inp}/></div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div>
                <label style={lbl}>Password</label>
                <div style={iw}><svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg><input type={showPw?"text":"password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required style={inp}/><span onClick={()=>setShowPw(!showPw)} style={{cursor:"pointer",color:"#aaa"}}><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span></div>
              </div>
              <div>
                <label style={lbl}>Confirm Password</label>
                <div style={iw}><svg width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><input type={showPw2?"text":"password"} name="confirmPassword" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required style={inp}/><span onClick={()=>setShowPw2(!showPw2)} style={{cursor:"pointer",color:"#aaa"}}><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></span></div>
              </div>
            </div>
            <p style={{ fontSize:".72rem", color:"#aaa", marginTop:5 }}>Min 8 characters with 1 number and 1 special character</p>

            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, fontSize:".83rem", color:"#666" }}>
              <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} style={{ accentColor:"#1d6af4", width:15, height:15, cursor:"pointer" }} />
              I agree to the <a href="#" style={{ color:"#1d6af4", fontWeight:600, textDecoration:"none" }}>Terms of Service</a> and <a href="#" style={{ color:"#1d6af4", fontWeight:600, textDecoration:"none" }}>Privacy Policy</a>
            </div>

            <button type="submit" disabled={loading} style={{ marginTop:20, width:"100%", padding:13, background: loading?"#93b4f8":"#1d6af4", color:"#fff", border:"none", borderRadius:9, fontSize:".97rem", fontWeight:700, cursor: loading?"not-allowed":"pointer" }}>
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:".85rem", color:"#888", marginTop:16 }}>
            Already have an account? <span onClick={() => navigate("/login")} style={{ color:"#1d6af4", fontWeight:700, cursor:"pointer" }}>Log in here</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;