import { useState } from "react";

const FilterFlights = () => {
  const [priceRange, setPriceRange] = useState(8000);
  const [airlines, setAirlines] = useState(["Vayu Airways"]);

  const toggleAirline = (airline) => {
    setAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    );
  };

  const [openSections, setOpenSections] = useState({ price: true, airlines: true, time: false });
  const toggle = (key) => setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 20, color: "var(--primary)" }}>⚙</span>
          <h3 style={{ fontSize: 15, fontWeight: 600 }}>Filter Flights</h3>
        </div>

        <div className="filter-group">
          <button className="filter-header" onClick={() => toggle("price")}>
            Price Range <span className={`arrow ${openSections.price ? "open" : ""}`}>▾</span>
          </button>
          <div className={`filter-body ${openSections.price ? "expanded" : "collapsed"}`} style={{ maxHeight: openSections.price ? 100 : 0 }}>
            <input type="range" min="1000" max="15000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
            <div className="range-labels"><span>₹3,000</span><span>₹{priceRange.toLocaleString()}</span></div>
          </div>
        </div>

        <div className="filter-group">
          <button className="filter-header" onClick={() => toggle("airlines")}>
            Airlines <span className={`arrow ${openSections.airlines ? "open" : ""}`}>▾</span>
          </button>
          <div className={`filter-body ${openSections.airlines ? "expanded" : "collapsed"}`} style={{ maxHeight: openSections.airlines ? 200 : 0 }}>
            {["Vayu Airways", "Air India", "IndiGo", "SpiceJet", "Vistara"].map((a) => (
              <label className="checkbox-label" key={a}>
                <input type="checkbox" checked={airlines.includes(a)} onChange={() => toggleAirline(a)} /> {a}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <button className="filter-header" onClick={() => toggle("time")}>
            Departure Time <span className={`arrow ${openSections.time ? "open" : ""}`}>▾</span>
          </button>
          <div className={`filter-body ${openSections.time ? "expanded" : "collapsed"}`} style={{ maxHeight: openSections.time ? 200 : 0 }}>
            <div className="time-grid">
              {["Morning (6-12)", "Afternoon (12-18)", "Evening (18-22)", "Night (22-6)"].map((t) => (
                <button className="time-btn" key={t}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-full" style={{ marginTop: 16 }}>Apply Filters</button>
      </div>
    </div>
  );
};

export default FilterFlights;