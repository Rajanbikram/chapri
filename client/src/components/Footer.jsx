const Footer = () => {
  return (
    <>
      <footer style={{
        background: "#111827", color: "#9ca3af",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        padding: "48px 24px 24px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* TOP ROW */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: 32, marginBottom: 40
          }}>
            {/* BRAND */}
            <div style={{ maxWidth: 260, flex: "1 1 200px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <path d="M20 7C12 13 3 15 3 15s9 3 13 9c2-7 9-11 21-13C31 9 26 5 20 7z" fill="#1d6af4"/>
                  <path d="M20 21c0 5-4 9-9 11 5-1 11-4 13-11z" fill="#1d6af4" opacity=".45"/>
                </svg>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>SkyHigh Travels</span>
              </div>
              <p style={{ fontSize: ".83rem", lineHeight: 1.7 }}>
                Your trusted partner for seamless flight bookings. Real-time updates, best prices, no hidden fees.
              </p>
            </div>

            {/* LINKS */}
            <div style={{
              display: "flex", gap: 32, flexWrap: "wrap",
              flex: "2 1 300px", justifyContent: "space-between"
            }}>
              {[
                { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
                { title: "Support", links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"] },
                { title: "Explore", links: ["Flights", "Destinations", "Airlines", "Travel Deals"] },
              ].map(col => (
                <div key={col.title} style={{ flex: "1 1 100px" }}>
                  <h4 style={{ color: "#fff", fontSize: ".88rem", fontWeight: 700, marginBottom: 14 }}>{col.title}</h4>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" style={{ color: "#9ca3af", fontSize: ".83rem", textDecoration: "none" }}
                          onMouseEnter={e => e.target.style.color = "#fff"}
                          onMouseLeave={e => e.target.style.color = "#9ca3af"}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div style={{
            borderTop: "1px solid #1f2937", paddingTop: 20,
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 12
          }}>
            <p style={{ fontSize: ".78rem", margin: 0 }}>© 2024 SkyHigh Travels. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Terms", "Cookies"].map(item => (
                <a key={item} href="#" style={{ color: "#9ca3af", fontSize: ".78rem", textDecoration: "none" }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;