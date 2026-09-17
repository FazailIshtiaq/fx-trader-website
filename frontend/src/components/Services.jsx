import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/axios.js";
import { useUserAuth } from "../context/UserAuthContext.jsx";
import SubscribeModal from "./SubscribeModal.jsx";

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    publicApi.get("/services").then((res) => setServices(res.data));
  }, []);

  const handlePlanClick = (service) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/#services" } });
      return;
    }
    setSelectedPlan(service);
  };

  return (
    <section id="services" className="px-8 py-16 text-center">
      <h2 className="text-3xl font-bold mb-2">
        My <span className="text-accent">Services</span>
      </h2>
      <p className="text-gray-400 mb-10">Choose the learning and trading resources that suit you.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => {
          const isActive = user?.approvedPlan === s.title;

          return (
            <div
              key={s._id}
              className={`bg-card rounded-xl p-8 border text-left ${
                s.isPopular ? "border-accent" : "border-gray-800"
              }`}
            >
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{s.subtitle}</p>
              <ul className="space-y-2 mb-6">
                {s.features?.map((f, i) => (
                  <li key={i} className="text-sm text-gray-300">✔ {f}</li>
                ))}
              </ul>

              {isActive ? (
                <button
                  disabled
                  className="w-full bg-green-500/20 text-green-400 border border-green-500 py-2 rounded-full font-semibold cursor-default"
                >
                  ✓ Active Plan
                </button>
              ) : (
                <button
                  onClick={() => handlePlanClick(s)}
                  className="w-full bg-accent text-black py-2 rounded-full font-semibold"
                >
                  {s.buttonLabel}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!isAuthenticated && (
        <p className="text-gray-500 text-sm mt-6">
          You'll need to log in or create an account to subscribe.
        </p>
      )}

      {selectedPlan && (
        <SubscribeModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  );
}