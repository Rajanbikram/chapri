import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#222" }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: 520,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 20px", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.52)"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", maxWidth: 620, lineHeight: 1.14, marginBottom: 16 }}>
            Explore the World Without Limits
          </h1>
          <p style={{ color: "#b8cfff", fontSize: "1rem", maxWidth: 430, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Book your next adventure with real-time updates, no hidden fees, and the best prices guaranteed.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button
              onClick={() => navigate("/register")}
              style={{ padding: "13px 32px", background: "#1d6af4", color: "#fff", border: "none", borderRadius: 8, fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
              Get Started
            </button>
            <button
              style={{ padding: "13px 32px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.6)", borderRadius: 8, fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>
              Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#f4f6fb", padding: "70px 40px", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
        {[
          {
            title: "Best Prices",
            desc: "We scan hundreds of airlines to find you the most competitive fares across the globe.",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#1d6af4" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <circle cx="7" cy="7" r="1.2" fill="#1d6af4" stroke="none"/>
              </svg>
            )
          },
          {
            title: "24/7 Support",
            desc: "Our dedicated support team is available around the clock to help with your travel needs.",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#1d6af4" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 18v-6a9 9 0 0118 0v6"/>
                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
              </svg>
            )
          },
          {
            title: "Secure Booking",
            desc: "Your data security is our priority. Every transaction is encrypted and protected.",
            icon: (
              <svg width="24" height="24" fill="none" stroke="#1d6af4" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            )
          },
        ].map(f => (
          <div key={f.title} style={{ textAlign: "center", maxWidth: 200 }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px" }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: ".98rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontSize: ".83rem", color: "#666", lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;