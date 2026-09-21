import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext.jsx";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useUserAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="relative flex items-center justify-between px-8 py-4">
      <div className="text-xl font-bold">
        <span className="text-accent">FX</span> TRADER
      </div>

      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        className="text-2xl text-accent md:hidden"
      >
        ☰
      </button>

      <div className="hidden gap-6 text-sm items-center md:flex">
        <a href="#home">Home</a>
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

      {isMobileMenuOpen && (
        <div className="absolute left-4 right-4 top-full z-10 flex flex-col gap-4 rounded-xl border border-gray-800 bg-card p-5 text-sm md:hidden">
          <a href="#home" onClick={closeMobileMenu}>Home</a>
          <a href="#social-media" onClick={closeMobileMenu} className="text-accent">Social Media</a>
          <a href="#courses" onClick={closeMobileMenu}>Courses</a>
          <a href="#videos" onClick={closeMobileMenu}>Videos</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>

          {isAuthenticated ? (
            <div className="flex flex-col gap-3 border-t border-gray-800 pt-4">
              <span className="text-gray-300">
                {user.name}
                {user.approvedPlan && (
                  <span className="text-accent"> · {user.approvedPlan}</span>
                )}
              </span>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="self-start text-gray-400 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="self-start rounded-full bg-accent px-4 py-1.5 font-semibold text-black"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}