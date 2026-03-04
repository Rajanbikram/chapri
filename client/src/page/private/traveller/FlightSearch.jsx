import { useState } from "react";
import { searchFlights } from "../../../services/traveller/flightService";
const FlightSearch = ({ goTo, setSelectedFlight }) => {
  const [form, setForm] = useState({ from: "DEL", to: "BLR", date: "2026-03-15" });
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchFlights(form.from, form.to, form.date);
      setResults(data.flights);
      setSearched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body">
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Search Flights</h3>
          <div className="form-grid form-grid-4">
            <div className="form-group">
              <label className="form-label">From</label>
              <input className="form-input" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} placeholder="City or Airport" />
            </div>
            <div className="form-group">
              <label className="form-label">To</label>
              <input className="form-input" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} placeholder="City or Airport" />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
              <button className="btn btn-primary btn-full" onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "🔍 Search Flights"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {searched && (
        <div className="card">
          <div className="card-header"><h3>{form.from} → {form.to} — {results.length} flights found</h3></div>
          {results.map((f) => (
            <div className="flight-row" key={f.id} onClick={() => { setSelectedFlight(f); goTo("details"); }}>
              <div className="flight-left">
                <div className="stat-icon" style={{ marginBottom: 0 }}>✈</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.airline}</div>
                  <div style={{ fontSize: 12, color: "var(--muted-fg)" }}>{f.flightNo}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 14 }}>
                <div className="flight-time"><div className="time">{f.dep}</div><div className="code">{f.from}</div></div>
                <div className="flight-duration">🕐 {f.duration}</div>
                <div className="flight-time"><div className="time">{f.arr}</div><div className="code">{f.to}</div></div>
              </div>
              <div className="flight-right">
                <div className="flight-price">₹{f.price}</div>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightSearch;