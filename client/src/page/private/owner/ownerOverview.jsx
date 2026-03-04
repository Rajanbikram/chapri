import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { getAllBookings } from "../../../services/owner/ownerBookingService";
import Chart from "chart.js/auto";

const badge = (status) => {
  if (["Confirmed", "Active", "On Time", "Approved"].includes(status))
    return <span className="badge badge-success">{status}</span>;
  if (["Waitlisted", "Delayed", "Pending"].includes(status))
    return <span className="badge badge-warning">{status}</span>;
  return <span className="badge badge-danger">{status}</span>;
};

const revenueData = [
  { month: "Sep", revenue: 1850000 }, { month: "Oct", revenue: 2100000 },
  { month: "Nov", revenue: 2450000 }, { month: "Dec", revenue: 3200000 },
  { month: "Jan", revenue: 2800000 }, { month: "Feb", revenue: 2650000 },
];

const OwnerOverview = () => {
  const { showToast } = useOutletContext();
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    getAllFlights().then((d) => setFlights(d.flights || [])).catch(console.error);
    getAllBookings().then((d) => setBookings(d.bookings || [])).catch(console.error);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: revenueData.map((d) => d.month),
        datasets: [{ label: "Revenue", data: revenueData.map((d) => d.revenue), backgroundColor: "hsl(215,70%,45%)", borderRadius: 6 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: (v) => "₹" + (v / 100000).toFixed(0) + "L" }, grid: { color: "#e2e8f0" } },
          x: { grid: { display: false } },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, []);

  const activeFlights = flights.filter((f) => f.status === "On Time").length;

  return (
    <div className="space-y">
      <div className="grid grid-4">
        <div className="stat-card flex items-center gap-4">
          <div className="icon-box" style={{ background: "rgba(59,130,246,.1)", color: "var(--primary)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 4l-1.5 6.5L16 12l-3 6-2.5 1.5"/></svg>
          </div>
          <div><p className="text-2xl font-bold">{activeFlights}</p><p className="text-sm text-muted">Active Flights</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="icon-box" style={{ background: "rgba(34,197,94,.1)", color: "var(--success)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div><p className="text-2xl font-bold">{bookings.length}</p><p className="text-sm text-muted">Total Passengers</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="icon-box" style={{ background: "rgba(245,158,11,.1)", color: "var(--accent)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 13L2 9Z"/></svg>
          </div>
          <div><p className="text-2xl font-bold">₹26.5L</p><p className="text-sm text-muted">Monthly Revenue</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="icon-box" style={{ background: "rgba(139,92,246,.1)", color: "hsl(262,60%,55%)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <div><p className="text-2xl font-bold">82%</p><p className="text-sm text-muted">Avg Occupancy</p></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Revenue Overview (Last 6 Months)</h3>
          <div className="chart-container"><canvas ref={chartRef}></canvas></div>
        </div>
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Flight Status</h3>
          <div className="space-y-sm">
            {flights.slice(0, 5).map((f) => (
              <div className="flex items-center justify-between text-sm" key={f.id}>
                <div><span className="font-medium">{f.flightNo}</span> <span className="text-muted">{f.from} → {f.to}</span></div>
                {badge(f.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-sm font-semibold mb-4">Recent Bookings</h3>
        <div className="overflow-x">
          <table className="data-table">
            <thead><tr><th>Passenger</th><th>Flight</th><th>Seat</th><th>Status</th></tr></thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id}>
                  <td className="font-medium">{b.name}</td>
                  <td>{b.flight}</td>
                  <td>{b.seat}</td>
                  <td>{badge(b.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerOverview;