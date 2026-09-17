import { useEffect, useState } from "react";
import { publicApi } from "../api/axios.js";

function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    let videoId = null;

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : null;
  } catch {
    return null;
  }
}

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    publicApi.get("/videos").then((res) => setVideos(res.data));
  }, []);

  const embedUrl = activeVideo ? getYouTubeEmbedUrl(activeVideo.videoUrl) : null;

  return (
    <section id="videos" className="px-8 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Trading <span className="text-accent">Videos</span>
      </h2>
      <div className="grid md:grid-cols-4 gap-4">
        {videos.map((v) => (
          <button
            key={v._id}
            onClick={() => setActiveVideo(v)}
            className="text-left bg-card rounded-xl overflow-hidden border border-gray-800 hover:border-accent transition"
          >
            <div className="relative">
              <img src={v.thumbnailUrl} alt={v.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black ml-1" />
                </div>
              </div>
              {v.duration && (
                <span className="absolute bottom-1 right-1 bg-black/70 text-xs px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm">{v.title}</p>
              <p className="text-xs text-gray-400">{v.category}</p>
            </div>
          </button>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-card rounded-xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={activeVideo.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={activeVideo.videoUrl} controls autoPlay className="w-full h-full" />
              )}
            </div>
            <div className="p-4 flex justify-between items-center">
              <p className="font-semibold">{activeVideo.title}</p>
              <button onClick={() => setActiveVideo(null)} className="text-gray-400 hover:text-white text-sm">
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}