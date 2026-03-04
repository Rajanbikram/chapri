import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { cancelFlight, delayFlight } from "../../../services/owner/ownerCancellationService";

const badge = (status) => {
  if (status === "On Time") return <span className="badge badge-success">{status}</span>;
  if (status === "Delayed") return <span className="badge badge-warning">{status}</span>;
  return <span className="badge badge-danger">{status}</span>;
};

const CancellationDelay = () => {
  const { showToast } = useOutletContext();
  const [flights, setFlights] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getAllFlights().then((d) => setFlights(d.flights || [])).catch(console.error);
  }, []);

  const handleConfirm = async () => {
    try {
      if (modal.action === "cancel") {
        await cancelFlight(modal.id);
        setFlights((prev) => prev.map((f) => f.id === modal.id ? { ...f, status: "Cancelled" } : f));
        showToast(`Flight ${modal.flightNo} cancelled`);
      } else {
        await delayFlight(modal.id);
        setFlights((prev) => prev.map((f) => f.id === modal.id ? { ...f, status: "Delayed" } : f));
        showToast(`Flight ${modal.flightNo} marked as delayed`);
      }
    } catch (err) {
      showToast("Error performing action.");
    }
    setModal(null);
  };

  return (
    <div className="section">
      <div className="stat-card">
        <h2 className="text-lg font-semibold mb-4">Flight Cancellation / Delay Management</h2>
        <div className="overflow-x">
          <table className="data-table">
            <thead><tr><th>Flight</th><th>Route</th><th>Departure</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id}>
                  <td className="font-medium">{f.flightNo}</td>
                  <td>{f.from} → {f.to}</td>
                  <td>{f.dep}</td>
                  <td>{badge(f.status)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-sm text-danger" disabled={f.status === "Cancelled"} onClick={() => setModal({ id: f.id, flightNo: f.flightNo, action: "cancel" })}>Cancel</button>
                      <button className="btn btn-outline btn-sm" disabled={f.status === "Cancelled"} onClick={() => setModal({ id: f.id, flightNo: f.flightNo, action: "delay" })}>Delay</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-box" style={{ background: "rgba(239,68,68,.1)", color: "var(--destructive)" }}>
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <h3 className="text-lg font-semibold">Confirm {modal.action === "cancel" ? "Cancellation" : "Delay"}</h3>
            </div>
            <p className="text-sm text-muted mb-6">Are you sure you want to {modal.action} flight <strong style={{ color: "var(--fg)" }}>{modal.flightNo}</strong>? This action will notify all booked passengers.</p>
            <div className="flex" style={{ justifyContent: "flex-end", gap: 12 }}>
              <button className="btn btn-outline" onClick={() => setModal(null)}>Go Back</button>
              <button className="btn btn-danger" onClick={handleConfirm}>{modal.action === "cancel" ? "Cancel Flight" : "Mark Delayed"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancellationDelay;