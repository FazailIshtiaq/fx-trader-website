import { useState } from "react";
import api from "../api/axios.js";

const plans = ["Free", "Pro", "Advance", "Become Legendary Trader"];
const emptyVideo = { title: "", category: "", thumbnailUrl: "", videoUrl: "", duration: "", requiredPlan: "Free" };

export default function ServiceVideoManager({ videos, onChanged }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyVideo);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, requiredPlan: form.requiredPlan || "Free" };
    if (editingId) {
      await api.put(`/courses/${editingId}`, payload);
    } else {
      await api.post("/courses", payload);
    }
    setForm(emptyVideo);
    setEditingId(null);
    setShowForm(false);
    onChanged();
  };

  const handleEdit = (v) => {
    setForm({
      title: v.title,
      category: v.category || "",
      thumbnailUrl: v.thumbnailUrl,
      videoUrl: v.videoUrl,
      duration: v.duration || "",
      requiredPlan: v.requiredPlan || "Free",
    });
    setEditingId(v._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    onChanged();
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-gray-300">
          Course videos ({videos.length})
        </p>
        <button
          onClick={() => {
            setForm(emptyVideo);
            setEditingId(null);
            setShowForm((s) => !s);
          }}
          className="bg-accent text-black px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition"
        >
          {showForm ? "Cancel" : "+ Add Video"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 bg-bg p-3 rounded-lg border border-gray-700 mb-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Video title" className="p-2 rounded bg-card border border-gray-700 text-sm col-span-2" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category (optional)" className="p-2 rounded bg-card border border-gray-700 text-sm" />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 08:24)" className="p-2 rounded bg-card border border-gray-700 text-sm" />
          <select name="requiredPlan" value={form.requiredPlan} onChange={handleChange} className="p-2 rounded bg-card border border-gray-700 text-sm col-span-2" required>
            {plans.map((plan) => <option key={plan} value={plan}>{plan}</option>)}
          </select>
          <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} placeholder="Thumbnail image URL" className="p-2 rounded bg-card border border-gray-700 text-sm col-span-2" required />
          <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="Video URL (YouTube, etc.)" className="p-2 rounded bg-card border border-gray-700 text-sm col-span-2" required />
          <button className="col-span-2 bg-accent text-black py-1.5 rounded text-sm font-semibold">
            {editingId ? "Update Video" : "Add Video"}
          </button>
        </form>
      )}

      {videos.length === 0 ? (
        <p className="text-xs text-gray-500">No videos added yet.</p>
      ) : (
        <div className="space-y-2">
          {videos.map((v) => (
            <div key={v._id} className="flex items-center justify-between bg-bg p-2 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2">
                <img src={v.thumbnailUrl} alt="" className="w-12 h-8 object-cover rounded" />
                <div>
                  <p className="text-sm">{v.title}</p>
                  <p className="text-xs text-gray-500">{v.requiredPlan || "Free"} {v.category && `· ${v.category}`} {v.duration && `· ${v.duration}`}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <button onClick={() => handleEdit(v)} className="text-accent">Edit</button>
                <button onClick={() => handleDelete(v._id)} className="text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}