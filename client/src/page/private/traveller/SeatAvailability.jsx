import { useState, useEffect } from "react";
import { getSeatAvailability } from "../../../services/traveller/seatService";

const SeatAvailability = () => {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    getSeatAvailability()
      .then((data) => setAvailability(data.availability))
      .catch(console.error);
  }, []);

  return (
    <div className="card">
      <div className="card-header"><h3>Real-Time Seat Availability</h3></div>
      <div className="card-body">
        <div className="avail-grid">
          {availability.map((f) => {
            const avail = f.total - f.booked;
            const pct = f.total ? Math.round((f.booked / f.total) * 100) : 0;
            return (
              <div className="avail-card" key={f.id}>
                <div className="avail-top">
                  <div><div className="avail-id">{f.id}</div><div className="avail-route">{f.route}</div></div>
                  <span className={`badge ${avail < 10 ? "badge-danger" : "badge-primary"}`}>{avail} available</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
                <div className="avail-text">{f.booked}/{f.total} seats booked ({pct}%)</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeatAvailability;