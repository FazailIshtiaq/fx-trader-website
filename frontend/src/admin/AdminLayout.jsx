import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-56 bg-card border-r border-gray-800 p-6 flex flex-col gap-4">
        <h2 className="font-bold text-accent mb-4">Admin Panel</h2>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/socials">Social Links</Link>
        <Link to="/admin/services">Services</Link>
        <Link to="/admin/videos">Videos</Link>
        <Link to="/admin/messages">Messages</Link>
        <Link to="/admin/subscriptions">Subscriptions</Link>
        <button onClick={logout} className="mt-auto text-red-400 text-left">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}