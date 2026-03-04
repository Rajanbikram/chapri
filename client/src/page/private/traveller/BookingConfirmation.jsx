import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const bookingData = state?.bookingData;
  const selectedSeat = state?.selectedSeat;
  const flight = state?.flight;

  if (!bookingData || !flight) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ color: "var(--muted-fg)", marginBottom: 16 }}>No booking found.</p>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard/search")}>
          Search Flights
        </button>
      </div>
    );
  }

  const details = [
    ["Booking ID", `VY-BK-${bookingData.id}`],
    ["Flight", `${flight.flightNo} · ${flight.from} → ${flight.to}`],
    ["Date", `${flight.date || ""} ${flight.dep || ""}`],
    ["Seat", selectedSeat || "N/A"],
    ["Passenger", user?.name || "N/A"],
    ["Amount Paid", `₹${bookingData.totalAmount || flight.price}`],
  ];

  return (
    <div className="card confirm-card">
      <div className="confirm-header">
        <div className="confirm-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p>Your flight has been booked successfully</p>
      </div>
      <div className="card-body">
        <div className="confirm-details">
          {details.map(([l, v]) => (
            <div className="confirm-row" key={l}>
              <span className="lbl">{l}</span>
              <span className="val">{v}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-full">⬇ Download E-Ticket</button>
        <div className="confirm-note">
          Confirmation details have been sent to {user?.email || "your email"}
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;