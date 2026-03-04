import { useLocation, useNavigate } from "react-router-dom";

const FlightDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const f = state?.flight || {
    flightNo: "VY-201", airline: "Vayu Airways",
    from: "DEL", to: "BLR",
    dep: "06:15", arr: "08:45",
    duration: "2h 30m", date: "15 Mar 2026"
  };

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div className="detail-header">
        <div className="detail-header-left">
          <span style={{ fontSize: 24 }}>✈</span>
          <div>
            <div className="name">{f.airline}</div>
            <div className="sub">{f.flightNo} · Airbus A320neo</div>
          </div>
        </div>
        <span className="detail-status">On Time</span>
      </div>
      <div className="card-body">
        <div className="detail-times">
          <div className="detail-time-block">
            <div className="big">{f.dep}</div>
            <div className="small">New Delhi ({f.from})</div>
          </div>
          <div className="detail-line">
            <div className="dur">🕐 {f.duration}</div>
            <div className="line"></div>
          </div>
          <div className="detail-time-block">
            <div className="big">{f.arr}</div>
            <div className="small">Bengaluru ({f.to})</div>
          </div>
        </div>
        <div className="info-grid">
          <div className="info-box"><div className="label">Date</div><div className="val">{f.date || "15 Mar 2026"}</div></div>
          <div className="info-box"><div className="label">Terminal</div><div className="val">T3</div></div>
          <div className="info-box"><div className="label">Gate</div><div className="val">G12</div></div>
          <div className="info-box"><div className="label">Meals</div><div className="val">Complimentary snacks</div></div>
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