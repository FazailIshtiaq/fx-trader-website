import { useEffect, useState } from "react";
import api from "../api/axios.js";

const empty = { platform: "", handle: "", link: "", buttonLabel: "Follow", order: 0 };

export default function ManageSocials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.get("/socials").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/socials/${editingId}`, form);
    } else {
      await api.post("/socials", form);
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/socials/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Social Links</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-card p-6 rounded-xl border border-gray-800 mb-8">
        <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform (e.g. Instagram)" className="p-2 rounded bg-bg border border-gray-700" required />
        <input name="handle" value={form.handle} onChange={handleChange} placeholder="Handle (e.g. @trader_official)" className="p-2 rounded bg-bg border border-gray-700" required />
        <input name="link" value={form.link} onChange={handleChange} placeholder="URL" className="p-2 rounded bg-bg border border-gray-700 col-span-2" required />
        <input name="buttonLabel" value={form.buttonLabel} onChange={handleChange} placeholder="Button label" className="p-2 rounded bg-bg border border-gray-700" />
        <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="Order" className="p-2 rounded bg-bg border border-gray-700" />
        <button className="col-span-2 bg-accent text-black py-2 rounded font-semibold">
          {editingId ? "Update" : "Add"} Social Link
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between items-center bg-card p-4 rounded-xl border border-gray-800">
            <div>
              <p className="font-semibold">{item.platform} — {item.handle}</p>
              <p className="text-sm text-gray-400">{item.link}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(item)} className="text-accent">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
