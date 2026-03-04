import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllUsers, blockUser, unblockUser } from "../../../services/owner/ownerUserService";

const badge = (status) => {
  if (status === "Active") return <span className="badge badge-success">{status}</span>;
  return <span className="badge badge-danger">{status}</span>;
};

const UserAccounts = () => {
  const { showToast } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getAllUsers().then((d) => setUsers(d.users || [])).catch(console.error);
  }, []);

  const handleConfirm = async () => {
    try {
      if (modal.action === "block") {
        await blockUser(modal.id);
        setUsers((prev) => prev.map((u) => u.id === modal.id ? { ...u, status: "Blocked" } : u));
        showToast(`${modal.name} blocked successfully`);
      } else {
        await unblockUser(modal.id);
        setUsers((prev) => prev.map((u) => u.id === modal.id ? { ...u, status: "Active" } : u));
        showToast(`${modal.name} unblocked successfully`);
      }
    } catch (err) {
      showToast("Error performing action.");
    }
    setModal(null);
  };

  return (
    <div className="section">
      <div className="stat-card">
        <h2 className="text-lg font-semibold mb-4">User Account Management</h2>
        <div className="overflow-x">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Bookings</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="font-medium">{u.name}</td>
                  <td className="text-muted">{u.email}</td>
                  <td className="text-muted">{u.createdAt?.slice(0, 10)}</td>
                  <td>{u.bookings || 0}</td>
                  <td>{badge(u.status || "Active")}</td>
                  <td>
                    <button
                      className={`btn btn-outline btn-sm ${u.status !== "Blocked" ? "text-danger" : ""}`}
                      onClick={() => setModal({ id: u.id, name: u.name, action: u.status === "Blocked" ? "unblock" : "block" })}
                    >
                      {u.status === "Blocked" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-box" style={{ background: "rgba(239,68,68,.1)", color: "var(--destructive)" }}>
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <h3 className="text-lg font-semibold">Confirm {modal.action === "block" ? "Block" : "Unblock"}</h3>
            </div>
            <p className="text-sm text-muted mb-6">Are you sure you want to {modal.action} <strong style={{ color: "var(--fg)" }}>{modal.name}</strong>?</p>
            <div className="flex" style={{ justifyContent: "flex-end", gap: 12 }}>
              <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
              <button className={`btn ${modal.action === "block" ? "btn-danger" : "btn-primary"}`} onClick={handleConfirm}>
                {modal.action === "block" ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccounts;