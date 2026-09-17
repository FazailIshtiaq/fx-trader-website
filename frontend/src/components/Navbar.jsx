import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext.jsx";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useUserAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="text-xl font-bold">
        <span className="text-accent">FX</span> TRADER
      </div>
      <div className="flex gap-6 text-sm items-center">
        <a href="#social-media" className="text-accent">Social Media</a>
        <a href="#courses">Courses</a>
        <a href="#videos">Videos</a>
        <a href="#contact">Contact</a>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-300">
              {user.name}
              {user.approvedPlan && (
                <span className="text-accent"> · {user.approvedPlan}</span>
              )}
            </span>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-accent text-black px-4 py-1.5 rounded-full font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}