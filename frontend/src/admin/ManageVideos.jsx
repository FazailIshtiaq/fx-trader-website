import { useEffect, useState } from "react";
import api from "../api/axios.js";

const empty = { title: "", category: "", thumbnailUrl: "", videoUrl: "", duration: "", order: 0 };

export default function ManageVideos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const load = () => api.get("/videos").then((res) => setItems(res.data));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/videos/${editingId}`, form);
    } else {
      await api.post("/videos", form);
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
    await api.delete(`/videos/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Videos</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-card p-6 rounded-xl border border-gray-800 mb-8">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 rounded bg-bg border border-gray-700" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Beginner)" className="p-2 rounded bg-bg border border-gray-700" />
        <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} placeholder="Thumbnail image URL" className="p-2 rounded bg-bg border border-gray-700 col-span-2" required />
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="Video URL (YouTube link, etc.)" className="p-2 rounded bg-bg border border-gray-700 col-span-2" required />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 08:24)" className="p-2 rounded bg-bg border border-gray-700" />
        <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="Order" className="p-2 rounded bg-bg border border-gray-700" />
        <button className="col-span-2 bg-accent text-black py-2 rounded font-semibold">
          {editingId ? "Update" : "Add"} Video
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between items-center bg-card p-4 rounded-xl border border-gray-800">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-400">{item.category} · {item.duration}</p>
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