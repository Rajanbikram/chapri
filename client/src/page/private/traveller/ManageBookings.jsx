import { useState, useEffect } from "react";
import { getMyBookings, rescheduleBooking } from "../../../services/traveller/bookingService";
import { cancelBooking } from "../../../services/traveller/cancellationService";
const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    getMyBookings()
      .then((data) => setBookings(data.bookings))
      .catch(console.error);
  }, []);

  const openCancel = (id) => { setCancelTarget(id); setCancelModal(true); };
  const closeCancel = () => { setCancelTarget(null); setCancelModal(false); };

  const confirmCancel = async () => {
    try {
      await cancelBooking(cancelTarget);
      setBookings((prev) => prev.map((b) => b.id === cancelTarget ? { ...b, status: "Cancelled" } : b));
    } catch (err) {
      console.error(err);
    }
    closeCancel();
  };

  const badgeCls = (status) =>
    status === "Confirmed" ? "badge-primary" : status === "Completed" ? "badge-muted" : "badge-danger";

  return (
    <>
      <div className="card">
        <div className="card-header"><h3>Manage Bookings</h3></div>
        <table>
          <thead>
            <tr><th>Booking ID</th><th>Flight</th><th>Route</th><th>Date</th><th>Status</th><th>Price</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 500 }}>VY-BK-{b.id}</td>
                <td>{b.Flight?.flightNo}</td>
                <td>{b.Flight?.from} → {b.Flight?.to}</td>
                <td style={{ color: "var(--muted-fg)" }}>{b.Flight?.date}</td>
                <td><span className={`badge ${badgeCls(b.status)}`}>{b.status}</span></td>
                <td style={{ fontWeight: 500 }}>₹{b.totalAmount}</td>
                <td>
                  {b.status === "Confirmed" && (
                    <>
                      <button className="btn-icon" title="Reschedule">🔄</button>
                      <button className="btn-icon danger" title="Cancel" onClick={() => openCancel(b.id)}>✕</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cancelModal && (
        <div className="modal-overlay" id="cancelModal">
          <div className="modal-content">
            <div className="modal-icon">⚠</div>
            <div className="modal-title">Cancel Booking?</div>
            <div className="modal-desc">Are you sure you want to cancel booking VY-BK-{cancelTarget}? This action cannot be undone.</div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeCancel}>Keep Booking</button>
              <button className="btn btn-danger" onClick={confirmCancel}>Cancel Booking</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBookings;