import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { updatePrice } from "../../../services/owner/ownerPricingService";

const TicketPricing = () => {
  const { showToast } = useOutletContext();
  const [flights, setFlights] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    getAllFlights().then((d) => setFlights(d.flights || [])).catch(console.error);
  }, []);

  const selected = flights.find((f) => String(f.id) === String(selectedId));

  const handleUpdate = async () => {
    try {
      await updatePrice(selectedId, newPrice);
      showToast(`Price updated to ₹${newPrice} for ${selected.flightNo}`);
      setFlights((prev) => prev.map((f) => String(f.id) === String(selectedId) ? { ...f, price: newPrice } : f));
    } catch (err) {
      showToast("Error updating price.");
    }
  };

  return (
    <div className="max-w-xl">
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box" style={{ background: "rgba(59,130,246,.1)", color: "var(--primary)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/></svg>
          </div>
          <div><h2 className="text-lg font-semibold">Manage Ticket Pricing</h2><p className="text-sm text-muted">Select a flight and update its ticket price</p></div>
        </div>
        <div className="space-y">
          <div>
            <label className="form-label">Select Flight</label>
            <select className="form-select" value={selectedId} onChange={(e) => { setSelectedId(e.target.value); setNewPrice(""); }}>
              <option value="">Choose a flight...</option>
              {flights.map((f) => (
                <option key={f.id} value={f.id}>{f.flightNo} — {f.from} → {f.to} (₹{f.price})</option>
              ))}
            </select>
          </div>
          {selected && (
            <div>
              <div style={{ background: "var(--muted)", borderRadius: 8, padding: 12, marginTop: 16 }} className="text-sm">
                <p className="text-muted">Current price: <strong style={{ color: "var(--fg)" }}>₹{selected.price}</strong></p>
                <p className="text-muted">Route: {selected.from} → {selected.to}</p>
              </div>
              <div style={{ marginTop: 16 }}>
                <label className="form-label">New Price (₹)</label>
                <input className="form-input" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder={selected.price} />
              </div>
              <button className="btn btn-primary w-full" style={{ marginTop: 16 }} onClick={handleUpdate}>Update Price</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPricing;