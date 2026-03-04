import { useState, useEffect } from "react";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { getSeatsByFlight } from "../../../services/owner/ownerSeatService";

const OwnerSeatAvailability = () => {
  const [flights, setFlights] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [seats, setSeats] = useState([]);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    getAllFlights().then((d) => {
      const f = d.flights || [];
      setFlights(f);
      if (f.length > 0) setSelectedId(String(f[0].id));
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    getSeatsByFlight(selectedId).then((d) => {
      setSeats(d.seats || []);
      setFlight(d.flight || null);
    }).catch(console.error);
  }, [selectedId]);

  const booked = seats.filter((s) => s.isOccupied).length;
  const total = seats.length;
  const available = total - booked;

  return (
    <div className="section">
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Seat Availability</h2>
          <select className="form-select" style={{ width: "auto" }} value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {flights.map((f) => (
              <option key={f.id} value={f.id}>{f.flightNo} — {f.from} → {f.to}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-3 mb-4">
          <div style={{ background: "var(--muted)", borderRadius: 8, padding: 12, textAlign: "center" }}><p className="text-2xl font-bold">{total}</p><p className="text-xs text-muted">Total Seats</p></div>
          <div style={{ background: "var(--muted)", borderRadius: 8, padding: 12, textAlign: "center" }}><p className="text-2xl font-bold" style={{ color: "var(--destructive)" }}>{booked}</p><p className="text-xs text-muted">Booked</p></div>
          <div style={{ background: "var(--muted)", borderRadius: 8, padding: 12, textAlign: "center" }}><p className="text-2xl font-bold" style={{ color: "var(--success)" }}>{available}</p><p className="text-xs text-muted">Available</p></div>
        </div>
        <div className="flex items-center gap-4 mb-3 text-xs text-muted">
          <div className="flex items-center gap-2"><div style={{ width: 12, height: 12, borderRadius: 2, background: "var(--success)" }}></div> Available</div>
          <div className="flex items-center gap-2"><div style={{ width: 12, height: 12, borderRadius: 2, background: "var(--destructive)" }}></div> Booked</div>
        </div>
        <div className="grid grid-6" style={{ gap: 6 }}>
          {seats.map((s) => (
            <div key={s.id} className={`seat ${s.isOccupied ? "booked" : "available"}`} title={`${s.seatNo} — ${s.isOccupied ? "Booked" : "Available"}`}>
              {s.seatNo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerSeatAvailability;