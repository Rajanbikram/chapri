import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSeatsByFlight } from "../../../services/traveller/seatService";

const seatRows = ["A", "B", "C", "D", "E", "F"];
const seatCols = Array.from({ length: 30 }, (_, i) => i + 1);

const SeatSelection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state?.flight;

  const [occupiedSeats, setOccupiedSeats] = useState(new Set());
  const [selectedSeat, setSelectedSeat] = useState(null);  // ← LOCAL STATE

  useEffect(() => {
    if (flight?.id) {
      getSeatsByFlight(flight.id)
        .then((data) => {
          const occupied = new Set(
            data.seats.filter((s) => s.isOccupied).map((s) => s.seatNo)
          );
          setOccupiedSeats(occupied);
        })
        .catch(console.error);
    }
  }, [flight]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
          Seat Selection — {flight?.flightNo || "VY-201"}
        </h3>
        <p style={{ fontSize: 14, color: "var(--muted-fg)", marginBottom: 24 }}>
          {selectedSeat ? `Selected: ${selectedSeat}` : "Click a seat to select."}
        </p>
        <div className="seat-legend">
          <div className="seat-legend-item"><div className="seat-swatch available"></div> Available</div>
          <div className="seat-legend-item"><div className="seat-swatch selected"></div> Selected</div>
          <div className="seat-legend-item"><div className="seat-swatch occupied"></div> Occupied</div>
        </div>
        <div className="seat-grid">
          <div className="seat-col-labels">
            {seatCols.map((c) => (
              <div className="seat-col-label" key={c}>{c}</div>
            ))}
          </div>
          {seatRows.map((row) => (
            <div className={`seat-row ${row === "C" ? "aisle" : ""}`} key={row}>
              <span className="seat-label">{row}</span>
              {seatCols.map((col) => {
                const seat = `${row}${col}`;
                const occ = occupiedSeats.has(seat);
                const sel = selectedSeat === seat;
                return (
                  <button
                    key={seat}
                    className={`seat-btn${occ ? " occupied" : ""}${sel ? " selected" : ""}`}
                    disabled={occ}
                    onClick={() => setSelectedSeat(seat)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: 24 }}
          disabled={!selectedSeat}
          onClick={() => navigate("/dashboard/payment", { state: { flight, selectedSeat } })}
        >
          Continue to Payment {selectedSeat ? `(Seat ${selectedSeat})` : ""}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;