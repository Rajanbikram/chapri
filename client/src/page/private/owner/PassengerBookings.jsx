import { useState, useEffect } from "react";
import { getAllBookings } from "../../../services/owner/ownerBookingService";

const badge = (status) => {
  if (["Confirmed"].includes(status)) return <span className="badge badge-success">{status}</span>;
  if (["Waitlisted"].includes(status)) return <span className="badge badge-warning">{status}</span>;
  return <span className="badge badge-danger">{status}</span>;
};

const PassengerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 5;

  const fetchBookings = (s, p) => {
    getAllBookings(s, p).then((d) => {
      setBookings(d.bookings || []);
      setTotal(d.total || 0);
    }).catch(console.error);
  };

  useEffect(() => { fetchBookings(search, page); }, [search, page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="section">
      <div className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Passenger Bookings</h2>
          <div className="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Search passengers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} style={{ width: 220 }} />
          </div>
        </div>
        <div className="overflow-x">
          <table className="data-table">
            <thead><tr><th>Passenger Name</th><th>Flight No.</th><th>Seat</th><th>Email</th><th>Status</th></tr></thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-medium">{b.name}</td>
                  <td>{b.flight}</td>
                  <td>{b.seat}</td>
                  <td className="text-muted">{b.email}</td>
                  <td>{badge(b.status)}</td>
                </tr>
              )) : (
                <tr><td colSpan="5" style={{ textAlign: "center", padding: 32 }} className="text-muted">No results found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <span>Page {page + 1} of {totalPages}</span>
            <div className="btns">
              <button className="btn btn-outline btn-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>◀</button>
              <button className="btn btn-outline btn-sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>▶</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerBookings;