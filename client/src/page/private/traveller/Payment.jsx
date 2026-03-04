import { useState } from "react";
import { createBooking } from "../../../services/traveller/bookingService";
import { createPayment } from "../../../services/traveller/paymentService";

const Payment = ({ flight, selectedSeat, goTo, setBookingData }) => {
  const [payMethod, setPayMethod] = useState("card");
  const [form, setForm] = useState({ cardNum: "", cardExp: "", cardCvv: "", cardName: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (payMethod === "card") {
      if (form.cardNum.replace(/\s/g, "").length < 16) e.cardNum = "Enter valid 16-digit card number";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExp)) e.cardExp = "Use MM/YY format";
      if (form.cardCvv.length < 3) e.cardCvv = "Enter 3-digit CVV";
      if (form.cardName.trim().length < 2) e.cardName = "Enter cardholder name";
    }
    return e;
  };

  const handlePay = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      const booking = await createBooking({
        flightId: flight?.id || 1,
        seatId: 1,
        totalAmount: flight?.price || 4850,
      });
      await createPayment({
        bookingId: booking.booking.id,
        method: payMethod,
        amount: flight?.price || 4850,
      });
      setBookingData(booking.booking);
      goTo("confirmation");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="card">
        <div className="card-body">
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Payment</h3>
          <div className="pay-methods">
            {[["card", "💳 Credit/Debit Card"], ["upi", "📱 UPI"], ["net", "🏦 Net Banking"]].map(([m, l]) => (
              <button key={m} className={`pay-method${payMethod === m ? " active" : ""}`} onClick={() => setPayMethod(m)}>{l}</button>
            ))}
          </div>

          {payMethod === "card" && (
            <div>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input className={`form-input${errors.cardNum ? " error" : ""}`} placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNum} onChange={(e) => setForm({ ...form, cardNum: e.target.value })} />
                {errors.cardNum && <div className="form-error">{errors.cardNum}</div>}
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Expiry</label>
                  <input className={`form-input${errors.cardExp ? " error" : ""}`} placeholder="MM/YY" maxLength={5} value={form.cardExp} onChange={(e) => setForm({ ...form, cardExp: e.target.value })} />
                  {errors.cardExp && <div className="form-error">{errors.cardExp}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input className={`form-input${errors.cardCvv ? " error" : ""}`} placeholder="123" type="password" maxLength={3} value={form.cardCvv} onChange={(e) => setForm({ ...form, cardCvv: e.target.value })} />
                  {errors.cardCvv && <div className="form-error">{errors.cardCvv}</div>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input className={`form-input${errors.cardName ? " error" : ""}`} placeholder="Arjun Patel" value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
                {errors.cardName && <div className="form-error">{errors.cardName}</div>}
              </div>
            </div>
          )}
          {payMethod === "upi" && (
            <div className="form-group">
              <label className="form-label">UPI ID</label>
              <input className="form-input" placeholder="arjun@upi" />
            </div>
          )}
          {payMethod === "net" && (
            <div className="bank-grid">
              {["SBI", "HDFC", "ICICI", "Axis Bank"].map((b) => (
                <button className="bank-btn" key={b}>{b}</button>
              ))}
            </div>
          )}

          <div className="pay-total">
            <div><div className="label">Total Amount</div><div className="amount">₹{flight?.price || 4850}</div></div>
            <button className="btn btn-primary" onClick={handlePay} disabled={loading}>
              {loading ? "Processing..." : "✓ Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;