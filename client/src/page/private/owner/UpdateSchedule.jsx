import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllFlights } from "../../../services/owner/ownerFlightService";
import { updateSchedule } from "../../../services/owner/ownerScheduleService";

const UpdateSchedule = () => {
  const { showToast } = useOutletContext();
  const [flights, setFlights] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ dep: "", arr: "" });

  useEffect(() => {
    getAllFlights().then((d) => setFlights(d.flights || [])).catch(console.error);
  }, []);

  const handleEdit = (f) => { setEditing(f.id); setEditForm({ dep: f.dep, arr: f.arr }); };

  const handleSave = async (id) => {
    try {
      await updateSchedule(id, editForm);
      setFlights((prev) => prev.map((f) => f.id === id ? { ...f, ...editForm } : f));
      showToast(`Flight updated successfully!`);
      setEditing(null);
    } catch (err) {
      showToast("Error updating schedule.");
    }
  };

  const badge = (status) => {
    if (["On Time"].includes(status)) return <span className="badge badge-success">{status}</span>;
    if (["Delayed"].includes(status)) return <span className="badge badge-warning">{status}</span>;
    return <span className="badge badge-danger">{status}</span>;
  };

  return (
    <div className="section">
      <div className="stat-card">
        <h2 className="text-lg font-semibold mb-4">Update Flight Schedule</h2>
        <div className="overflow-x">
          <table className="data-table">
            <thead><tr><th>Flight</th><th>Route</th><th>Departure</th><th>Arrival</th><th>Aircraft</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id}>
                  <td className="font-medium">{f.flightNo}</td>
                  <td>{f.from} → {f.to}</td>
                  <td>{editing === f.id ? <input className="form-input" type="time" value={editForm.dep} onChange={(e) => setEditForm({ ...editForm, dep: e.target.value })} style={{ width: 100, height: 32 }} /> : f.dep}</td>
                  <td>{editing === f.id ? <input className="form-input" type="time" value={editForm.arr} onChange={(e) => setEditForm({ ...editForm, arr: e.target.value })} style={{ width: 100, height: 32 }} /> : f.arr}</td>
                  <td>{f.aircraft}</td>
                  <td>{badge(f.status)}</td>
                  <td>
                    {editing === f.id ? (
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => handleSave(f.id)}>✅</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>❌</button>
                      </div>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(f)}>✏️</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchedule;