import { useLocation, useNavigate } from "react-router-dom";

const FlightDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const f = state?.flight;

  if (!f) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ color: "var(--muted-fg)", marginBottom: 16 }}>No flight selected.</p>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard/search")}>
          Search Flights
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div className="detail-header">
        <div className="detail-header-left">
          <span style={{ fontSize: 24 }}>✈</span>
          <div>
            <div className="name">{f.airline}</div>
            <div className="sub">{f.flightNo} · {f.aircraft || "Airbus A320"}</div>
          </div>
        </div>
        <span className="detail-status">{f.status || "On Time"}</span>
      </div>

      <div className="card-body">
        <div className="detail-times">
          <div className="detail-time-block">
            <div className="big">{f.dep}</div>
            {/* ← f.from — database bata */}
            <div className="small">{f.from}</div>
          </div>
          <div className="detail-line">
            <div className="dur">🕐 {f.duration || "N/A"}</div>
            <div className="line"></div>
          </div>
          <div className="detail-time-block">
            <div className="big">{f.arr}</div>
            {/* ← f.to — database bata */}
            <div className="small">{f.to}</div>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <div className="label">Date</div>
            {/* ← f.date — database bata */}
            <div className="val">{f.date || "N/A"}</div>
          </div>
          <div className="info-box">
            <div className="label">Terminal</div>
            <div className="val">T3</div>
          </div>
          <div className="info-box">
            <div className="label">Gate</div>
            <div className="val">G12</div>
          </div>
          <div className="info-box">
            <div className="label">Meals</div>
            <div className="val">Complimentary snacks</div>
          </div>
        </div>

        <div className="baggage-box">
          <div className="icon">🧳</div>
          <div>
            <div className="title">Baggage Allowance</div>
            <div className="desc">Cabin: 7 kg · Check-in: 15 kg</div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full"
          style={{ marginTop: 24 }}
          onClick={() => navigate("/dashboard/seats", { state: { flight: f } })}
        >
          Select Seats & Continue
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;