import { useState } from "react";
import api from "../api/axios.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-8 py-14">
      <div className="bg-card border border-gray-800 rounded-2xl px-8 py-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center">
          Want to <span className="text-accent">Learn More?</span>
        </h2>
        <p className="text-gray-400 mt-2 text-center mb-8">
          Send me a message and I'll get back to you by email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full p-3 rounded bg-bg border border-gray-700"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full p-3 rounded bg-bg border border-gray-700"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={4}
            className="w-full p-3 rounded bg-bg border border-gray-700"
            required
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-accent text-black py-3 rounded-full font-semibold disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-500 text-sm text-center">
              Message sent! I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          )}
        </form>

        <div className="flex justify-center gap-3 mt-6">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            className="border border-accent text-accent px-5 py-2 rounded-full text-sm font-semibold"
          >
            WhatsApp
          </a>
          <a
            href="https://t.me/trader_official"
            target="_blank"
            rel="noreferrer"
            className="border border-gray-600 px-5 py-2 rounded-full text-sm font-semibold"
          >
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}