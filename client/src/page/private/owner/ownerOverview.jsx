import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { getAllBookings } from "../../../services/owner/ownerBookingService";
import { getOwnerStats } from "../../../services/owner/ownerOverviewService";
import Chart from "chart.js/auto";

const badge = (status) => {
  if (["Confirmed", "Active", "On Time", "Approved"].includes(status))
    return <span className="badge badge-success">{status}</span>;
  if (["Delayed", "Pending"].includes(status))
    return <span className="badge badge-warning">{status}</span>;
  if (["Cancelled", "Blocked"].includes(status))
    return <span className="badge badge-danger">{status}</span>;
  return <span className="badge badge-info">{status}</span>;
};

const formatRevenue = (amount) => {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

const OwnerOverview = () => {
  const { showToast } = useOutletContext() || {};
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    activeFlights: 0,
    totalPassengers: 0,
    monthlyRevenue: 0,
    avgOccupancy: 0,
  });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Back button disable — logout nagari dashboard bata najaos
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePop = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    getAllFlights()
      .then((d) => setFlights(d.flights || []))
      .catch(console.error);

    getAllBookings({ page: 0, limit: 5 })
      .then((d) => setBookings(d.bookings || []))
      .catch(console.error);

    getOwnerStats()
      .then((d) => setStats(d))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{
          label: "Revenue (₹)",
          data: [180000, 220000, 195000, 240000, 210000, stats.monthlyRevenue || 265000],
          backgroundColor: "#1d6af4",
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [stats.monthlyRevenue]);

  const statCards = [
    { label: "Active Flights",    value: stats.activeFlights,              icon: "✈", color: "#1d6af4", bg: "#e8f0fe" },
    { label: "Total Passengers",  value: stats.totalPassengers,            icon: "👥", color: "#0d9488", bg: "#ccfbf1" },
    { label: "Monthly Revenue",   value: formatRevenue(stats.monthlyRevenue), icon: "◈", color: "#d97706", bg: "#fef3c7" },
    { label: "Avg Occupancy",     value: `${stats.avgOccupancy}%`,         icon: "↗", color: "#7c3aed", bg: "#ede9fe" },
  ];

  return (
    <div>
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        {statCards.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><h3>Revenue Overview</h3></div>
          <div className="card-body chart-container"><canvas ref={chartRef} /></div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Flight Status</h3></div>
          <div className="card-body">
            {flights.slice(0, 5).map((f) => (
              <div key={f.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{f.flightNo}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-fg)" }}>{f.from} → {f.to}</div>
                </div>
                {badge(f.status || "On Time")}
              </div>
            ))}
            {flights.length === 0 && (
              <div style={{ textAlign: "center", color: "var(--muted-fg)", padding: 20 }}>No flights found</div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3>Recent Bookings</h3></div>
        <div className="card-body">
          <table className="data-table">
            <thead>
              <tr><th>Passenger</th><th>Flight</th><th>Seat</th><th>Status</th></tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.flight}</td>
                  <td>{b.seat}</td>
                  <td>{badge(b.status)}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--muted-fg)" }}>No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;