import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);

  const load = () => api.get("/contact").then((res) => setMessages(res.data));
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={m._id}
            className={`bg-card p-4 rounded-xl border ${
              m.isRead ? "border-gray-800" : "border-accent"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{m.name} <span className="text-gray-400 text-sm">({m.email})</span></p>
                <p className="text-sm text-gray-300 mt-2">{m.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                {!m.isRead && (
                  <button onClick={() => markRead(m._id)} className="text-accent text-sm">
                    Mark read
                  </button>
                )}
                <button onClick={() => remove(m._id)} className="text-red-400 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}