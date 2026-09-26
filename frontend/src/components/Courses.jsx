import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/axios.js";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import SubscribeModal from "./SubscribeModal.jsx";

const planNames = ["Free", "Pro", "Advance", "Become Legendary Trader"];

function getYouTubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    let videoId = null;
    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") videoId = parsed.searchParams.get("v");
      else if (parsed.pathname.startsWith("/embed/")) return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : null;
  } catch {
    return null;
  }
}

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [activePlan, setActivePlan] = useState("Free");
  const [activeCourse, setActiveCourse] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([publicApi.get("/courses"), publicApi.get("/services")]).then(([courseRes, serviceRes]) => {
      setCourses(courseRes.data);
      setServices(serviceRes.data);
    });
  }, []);

  const embedUrl = activeCourse ? getYouTubeEmbedUrl(activeCourse.videoUrl) : null;
  const plans = planNames.map((name) => {
    const service = services.find((item) => item.title.toLowerCase() === name.toLowerCase());
    return {
      title: name,
      price: service?.price || "",
      subtitle: name === "Free" ? "Open to everyone" : "Payment approval required",
    };
  });

  const visibleCourses = courses.filter((course) => (course.requiredPlan || "Free") === activePlan);
  const handlePlanClick = (plan) => {
    if (plan.title === "Free" || user?.approvedPlan === plan.title) {
      setActivePlan(plan.title);
      return;
    }
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/#courses" } });
      return;
    }
    setSelectedPlan(plan);
  };

  const handleCourseClick = (course) => {
    if (!course.locked) setActiveCourse(course);
  };

  return (
    <section id="courses" className="px-8 py-16">
      <h2 className="text-3xl font-bold mb-2">
        My <span className="text-accent">Courses</span>
      </h2>
      <p className="text-gray-400 mb-8">
        Free lessons are open to everyone. Paid courses unlock after payment approval.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => {
          const planCourses = courses.filter((course) => (course.requiredPlan || "Free") === plan.title);
          const isSelected = activePlan === plan.title;
          const isApproved = user?.approvedPlan === plan.title;

          return (
            <button
              key={plan.title}
              onClick={() => handlePlanClick(plan)}
              className={`text-left bg-card rounded-xl p-5 border transition ${
                isSelected ? "border-accent" : "border-gray-800 hover:border-accent"
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-sm text-gray-400">{plan.subtitle}</p>
                </div>
                {isApproved && <span className="text-xs text-green-400">Approved</span>}
              </div>
              <p className="text-sm text-gray-300 mt-4">{planCourses.length} video{planCourses.length === 1 ? "" : "s"}</p>
              {plan.title !== "Free" && !isApproved && (
                <p className="text-xs text-accent mt-2">Click to submit payment screenshot</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {visibleCourses.map((c) => (
          <button
            key={c._id}
            onClick={() => handleCourseClick(c)}
            className={`text-left bg-card rounded-xl overflow-hidden border transition ${
              c.locked ? "border-gray-800 opacity-70 cursor-not-allowed" : "border-gray-800 hover:border-accent"
            }`}
          >
            <div className="relative">
              <img src={c.thumbnailUrl} alt={c.title} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                {c.locked ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">🔒</span>
                    <span className="text-xs text-accent font-semibold">{c.requiredPlan} only</span>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-black ml-1" />
                  </div>
                )}
              </div>
              {c.duration && (
                <span className="absolute bottom-1 right-1 bg-black/70 text-xs px-1.5 py-0.5 rounded">
                  {c.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm">{c.title}</p>
              <p className="text-xs text-gray-400">{c.category}</p>
            </div>
          </button>
        ))}
      </div>

      {visibleCourses.length === 0 && (
        <p className="text-gray-500">No videos have been added to this course yet.</p>
      )}

      {activeCourse && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveCourse(null)}
        >
          <div className="bg-card rounded-xl overflow-hidden max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={activeCourse.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={activeCourse.videoUrl} controls autoPlay className="w-full h-full" />
              )}
            </div>
            <div className="p-4 flex justify-between items-center">
              <p className="font-semibold">{activeCourse.title}</p>
              <button onClick={() => setActiveCourse(null)} className="text-gray-400 hover:text-white text-sm">
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPlan && (
        <SubscribeModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  );
}