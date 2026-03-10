import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: "#222" }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "120px 20px 60px" : "130px 20px 80px",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(.52)"
        }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{
            fontSize: isMobile ? "2rem" : "2.8rem",
            fontWeight: 800, color: "#fff",
            lineHeight: 1.2, marginBottom: 16,
            padding: "0 8px"
          }}>
            Explore the World Without Limits
          </h1>
          <p style={{
            color: "#b8cfff",
            fontSize: isMobile ? ".92rem" : "1rem",
            maxWidth: 430, margin: "0 auto 36px",
            lineHeight: 1.65, padding: "0 12px"
          }}>
            Book your next adventure with real-time updates, no hidden fees, and the best prices guaranteed.
          </p>
          <div style={{
            display: "flex", gap: 12,
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            padding: "0 24px"
          }}>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "13px 32px",
                background: "#1d6af4", color: "#fff",
                border: "none", borderRadius: 8,
                fontSize: ".97rem", fontWeight: 700,
                cursor: "pointer",
                width: isMobile ? "100%" : "auto"
              }}>
              Get Started
            </button>
            <button style={{
              padding: "13px 32px",
              background: "transparent", color: "#fff",
              border: "2px solid rgba(255,255,255,.6)",
              borderRadius: 8, fontSize: ".97rem",
              fontWeight: 600, cursor: "pointer",
              width: isMobile ? "100%" : "auto"
            }}>
              Explore Destinations
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        background: "#f4f6fb",
        padding: isMobile ? "48px 24px" : "70px 40px",
        display: "flex", justifyContent: "center",
        gap: isMobile ? 36 : 64,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        flexWrap: "wrap"
      }}>
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
          <div key={f.title} style={{
            textAlign: "center",
            width: isMobile ? "100%" : 200,
            maxWidth: 280
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: "50%",
              background: "#e8f0fe",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 15px"
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: ".98rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontSize: ".83rem", color: "#666", lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, #1d6af4 0%, #0a3fa0 100%)",
        padding: isMobile ? "48px 24px" : "70px 20px",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: isMobile ? "1.4rem" : "1.8rem",
          fontWeight: 800, color: "#fff", marginBottom: 12
        }}>
          Ready to Take Off?
        </h2>
        <p style={{
          color: "rgba(255,255,255,.8)",
          fontSize: ".95rem",
          maxWidth: 400, margin: "0 auto 28px"
        }}>
          Join thousands of travellers who trust SkyBound for their journeys.
        </p>
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "14px 40px",
            background: "#fff", color: "#1d6af4",
            border: "none", borderRadius: 8,
            fontSize: "1rem", fontWeight: 700,
            cursor: "pointer",
            width: isMobile ? "100%" : "auto",
            maxWidth: 300
          }}>
          Create Free Account
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;