import { useEffect, useState } from "react";
import { publicApi } from "../api/axios.js";

export default function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    publicApi.get("/socials").then((res) => setSocials(res.data));
  }, []);

  return (
    <footer className="border-t border-gray-800 px-8 py-10 text-sm text-gray-400">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold text-white">
            <span className="text-accent">FX</span> TRADER
          </p>
          <p className="mt-3 max-w-xs">Practical insights for a more disciplined trading journey.</p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Quick Links</h2>
          <div className="mt-3 flex flex-col items-start gap-2">
            <a href="#home" className="hover:text-accent">Home</a>
            <a href="#services" className="hover:text-accent">Services</a>
            <a href="#courses" className="hover:text-accent">Courses</a>
            <a href="#videos" className="hover:text-accent">Videos</a>
            <a href="#contact" className="hover:text-accent">Contact</a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Social Links</h2>
          <div className="mt-3 flex flex-col gap-2">
            {socials.map((social) => (
              <a
                key={social._id}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 hover:text-accent"
              >
                <span>{social.platform}</span>
                <span className="text-xs text-gray-500">{social.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-gray-800 pt-5 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} FX Trader. All rights reserved.</p>
        <p>Trading involves significant risk. Educational content is not financial advice.</p>
      </div>
    </footer>
  );
}
