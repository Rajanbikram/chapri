import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const { stats, recentBookings, loading } = useOutletContext();

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "var(--muted-fg)" }}>Loading...</div>;

  return (
    <>
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="card stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-change">{s.change}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><h3>Recent Bookings</h3></div>
        {recentBookings.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--muted-fg)" }}>No bookings yet.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Route</th>
                <th>Date</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 500 }}>VY-BK-{b.id}</td>
                  <td>{b.Flight?.from} → {b.Flight?.to}</td>
                  <td style={{ color: "var(--muted-fg)" }}>{b.Flight?.date}</td>
                  <td>
                    <span className={`badge ${b.status === "Confirmed" ? "badge-primary" : b.status === "Completed" ? "badge-muted" : "badge-danger"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>₹{b.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Overview;