import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { addFlight } from "../../../services/owner/ownerFlightService";

const AddFlight = () => {
  const { showToast } = useOutletContext();
  const [form, setForm] = useState({ flightNo: "", aircraft: "", from: "", to: "", dep: "", arr: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addFlight(form);
      showToast(`Flight ${form.flightNo} added successfully!`);
      setForm({ flightNo: "", aircraft: "", from: "", to: "", dep: "", arr: "" });
    } catch (err) {
      showToast("Error adding flight.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box" style={{ background: "rgba(59,130,246,.1)", color: "var(--primary)" }}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 4l-1.5 6.5L16 12l-3 6-2.5 1.5"/></svg>
          </div>
          <div><h2 className="text-lg font-semibold">Add New Flight</h2><p className="text-sm text-muted">Enter flight details to add a new route</p></div>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-2" style={{ gap: 16 }}>
          <div><label className="form-label">Flight Number</label><input className="form-input" placeholder="e.g. VY909" value={form.flightNo} onChange={(e) => setForm({ ...form, flightNo: e.target.value })} required /></div>
          <div><label className="form-label">Aircraft Type</label><input className="form-input" placeholder="e.g. Boeing 737" value={form.aircraft} onChange={(e) => setForm({ ...form, aircraft: e.target.value })} required /></div>
          <div><label className="form-label">Source</label><input className="form-input" placeholder="e.g. Delhi" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} required /></div>
          <div><label className="form-label">Destination</label><input className="form-input" placeholder="e.g. Mumbai" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} required /></div>
          <div><label className="form-label">Departure Time</label><input className="form-input" type="time" value={form.dep} onChange={(e) => setForm({ ...form, dep: e.target.value })} required /></div>
          <div><label className="form-label">Arrival Time</label><input className="form-input" type="time" value={form.arr} onChange={(e) => setForm({ ...form, arr: e.target.value })} required /></div>
          <div style={{ gridColumn: "span 2" }} className="pt-2">
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Saving..." : "Save Flight"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;