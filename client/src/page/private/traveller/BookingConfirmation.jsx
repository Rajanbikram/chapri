const BookingConfirmation = ({ bookingData, selectedSeat }) => {
  const details = [
    ["Booking ID", bookingData?.id ? `VY-BK-${bookingData.id}` : "VY-BK-78452"],
    ["Flight", "VY-201 · DEL → BLR"],
    ["Date", "15 Mar 2026, 06:15"],
    ["Seat", selectedSeat || "A14"],
    ["Passenger", "Arjun Patel"],
    ["Amount Paid", `₹${bookingData?.totalAmount || 4850}`],
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
        <div className="confirm-note">Confirmation details have been sent to arjun@email.com</div>
      </div>
    </div>
  );
};

export default BookingConfirmation;