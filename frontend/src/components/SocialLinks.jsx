import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function SocialLinks() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    api.get("/socials").then((res) => setSocials(res.data));
  }, []);

  return (
    <section id="social-media" className="px-8 pt-8 pb-16 text-center">
      <h2 className="text-3xl font-bold mb-2">
        Follow <span className="text-accent">Me</span>
      </h2>
      <p className="text-gray-400 mb-10">Stay connected for daily updates, insights and more.</p>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {socials.map((s) => (
          <div key={s._id} className="bg-card rounded-xl p-6 border border-gray-800">
            <p className="font-semibold">{s.platform}</p>
            <p className="text-sm text-gray-400">{s.handle}</p>
            <a
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block border border-accent text-accent text-sm px-4 py-1 rounded-full"
            >
              {s.buttonLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
