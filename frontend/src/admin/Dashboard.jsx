import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

export default function Dashboard() {
  const [newMessages, setNewMessages] = useState(0);
  const [pendingSubscriptions, setPendingSubscriptions] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadNotifications = async () => {
      try {
        const [messagesResponse, subscriptionsResponse] = await Promise.all([
          api.get("/contact"),
          api.get("/subscriptions"),
        ]);

        if (isMounted) {
          setNewMessages(messagesResponse.data.filter((message) => !message.isRead).length);
          setPendingSubscriptions(
            subscriptionsResponse.data.filter((subscription) => subscription.status === "pending").length
          );
        }
      } catch {
        // The dashboard can still render if notification counts are unavailable.
      }
    };

    loadNotifications();
    const refreshTimer = window.setInterval(loadNotifications, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Control Center</p>
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>
        <p className="text-gray-400 mt-2">Stay on top of messages and subscription approvals.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
        <Link
          to="/admin/messages"
          className="group relative overflow-hidden bg-card border border-gray-800 rounded-2xl p-6 hover:border-accent transition"
        >
          {newMessages > 0 && (
            <span className="absolute top-5 right-5 min-w-7 h-7 px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {newMessages > 99 ? "99+" : newMessages}
            </span>
          )}
          <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-5">✉</div>
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-sm text-gray-400 mt-2">View and manage contact messages.</p>
          <span className="inline-block text-accent text-sm font-semibold mt-6 group-hover:translate-x-1 transition">Open Messages →</span>
        </Link>

        <Link
          to="/admin/subscriptions"
          className="group relative overflow-hidden bg-card border border-gray-800 rounded-2xl p-6 hover:border-accent transition"
        >
          {pendingSubscriptions > 0 && (
            <span className="absolute top-5 right-5 min-w-7 h-7 px-2 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              {pendingSubscriptions > 99 ? "99+" : pendingSubscriptions}
            </span>
          )}
          <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl mb-5">✓</div>
          <h2 className="text-xl font-semibold">Subscriptions</h2>
          <p className="text-sm text-gray-400 mt-2">Review payment screenshots and approvals.</p>
          <span className="inline-block text-accent text-sm font-semibold mt-6 group-hover:translate-x-1 transition">Open Subscriptions →</span>
        </Link>
      </div>
    </div>
  );
}
