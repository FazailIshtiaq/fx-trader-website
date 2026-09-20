import { useEffect, useState } from "react";
import api, { BACKEND_ORIGIN } from "../api/axios.js";

// BACKEND_ORIGIN (from api/axios.js) is your backend's real URL (Railway in prod, localhost:5000 in dev).
// Uploaded screenshots are served from there at /uploads/...

export default function ManageSubscriptions() {
  const [subs, setSubs] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = () => api.get("/subscriptions").then((res) => setSubs(res.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    const adminNote = status === "rejected" ? window.prompt("Optional note for the customer (why rejected):") || "" : "";
    await api.put(`/subscriptions/${id}/status`, { status, adminNote });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this subscription request?")) return;
    await api.delete(`/subscriptions/${id}`);
    load();
  };

  const filtered = subs.filter((s) => filter === "all" || s.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Subscription Requests</h1>

      <div className="flex gap-2 mb-6">
        {["pending", "approved", "rejected", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              filter === f ? "bg-accent text-black border-accent" : "border-gray-700 text-gray-300"
            }`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && <p className="text-gray-400">No requests here.</p>}

        {filtered.map((s) => (
          <div key={s._id} className="bg-card p-4 rounded-xl border border-gray-800 flex gap-4">
            <img
              src={`${BACKEND_ORIGIN}${s.screenshotUrl}`}
              alt="Payment screenshot"
              className="w-32 h-32 object-cover rounded-lg border border-gray-700 cursor-pointer"
              onClick={() => window.open(`${BACKEND_ORIGIN}${s.screenshotUrl}`, "_blank")}
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {s.name} — <span className="text-accent">{s.planTitle}</span>{" "}
                    {s.planPrice && <span className="text-gray-400 text-sm">({s.planPrice})</span>}
                  </p>
                  <p className="text-sm text-gray-400">{s.email}</p>
                  {s.whatsapp && <p className="text-sm text-gray-400">WhatsApp: {s.whatsapp}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    s.status === "approved"
                      ? "bg-green-500/20 text-green-400"
                      : s.status === "rejected"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {s.status}
                </span>
              </div>

              {s.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateStatus(s._id, "approved")}
                    className="bg-accent text-black px-4 py-1.5 rounded-full text-sm font-semibold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(s._id, "rejected")}
                    className="border border-red-400 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold"
                  >
                    Reject
                  </button>
                </div>
              )}

              <button
                onClick={() => remove(s._id)}
                className="text-gray-500 hover:text-red-400 text-xs mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}