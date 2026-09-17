import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { publicApi } from "../api/axios.js";
import { useUserAuth } from "../context/UserAuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await publicApi.post("/users/register", form);
      login(data);
      // Send them back to wherever they were trying to go (e.g. subscribing to a plan)
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl w-full max-w-sm border border-gray-800">
        <h1 className="text-xl font-bold mb-6 text-center">Create Account</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-bg border border-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-bg border border-gray-700"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 rounded bg-bg border border-gray-700"
          required
        />
        <button className="w-full bg-accent text-black py-2 rounded font-semibold">
          Sign Up
        </button>
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent">Log in</Link>
        </p>
      </form>
    </div>
  );
}