import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/axios.js";
import { useUserAuth } from "../context/UserAuthContext.jsx";

// 👇 Edit these with your real payment details
const PAYMENT_DETAILS = {
  accountTitle: "Fazail Ishtiaq",
  bankName: "Meezan Bank",
  accountNumber: "PK00 MEZN 0000 0000 0000 0000",
  jazzcash: "0300 1234567",
  easypaisa: "0300 1234567",
};

export default function SubscribeModal({ plan, onClose }) {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [whatsapp, setWhatsapp] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  // Should never render without a user since Services.jsx checks first, but guard anyway.
  if (!user) {
    return null;
  }

  const alreadyOnThisPlan = user.approvedPlan === plan.title;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      setErrorMsg("Please attach your payment screenshot.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    const data = new FormData();
    data.append("whatsapp", whatsapp);
    data.append("planTitle", plan.title);
    data.append("planPrice", plan.price || "");
    data.append("screenshot", screenshot);

    try {
      await publicApi.post("/subscriptions", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-card border border-gray-800 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">
            Subscribe to <span className="text-accent">{plan.title}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        {alreadyOnThisPlan ? (
          <div className="text-center py-8">
            <p className="text-green-500 font-semibold mb-2">
              You already have {plan.title} access!
            </p>
            <p className="text-gray-400 text-sm">Enjoy your premium content.</p>
          </div>
        ) : status === "success" ? (
          <div className="text-center py-8">
            <p className="text-green-500 font-semibold mb-2">Request submitted!</p>
            <p className="text-gray-400 text-sm">
              We'll verify your payment and unlock your {plan.title} access once approved —
              you'll get an email, and can just log back in to see it.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-accent text-black px-6 py-2 rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Logged-in user info — auto-filled, read-only */}
            <div className="bg-bg border border-gray-700 rounded-lg p-3 mb-4 text-sm flex justify-between">
              <span className="text-gray-400">Subscribing as</span>
              <span>{user.name} ({user.email})</span>
            </div>

            {/* Payment instructions */}
            <div className="bg-bg border border-gray-700 rounded-xl p-4 mb-5 text-sm space-y-1">
              <p className="text-accent font-semibold mb-2">
                Send payment for {plan.title}{plan.price ? ` (${plan.price})` : ""} to:
              </p>
              <p><span className="text-gray-400">Account title:</span> {PAYMENT_DETAILS.accountTitle}</p>
              <p><span className="text-gray-400">Bank:</span> {PAYMENT_DETAILS.bankName}</p>
              <p><span className="text-gray-400">Account #:</span> {PAYMENT_DETAILS.accountNumber}</p>
              <p><span className="text-gray-400">JazzCash:</span> {PAYMENT_DETAILS.jazzcash}</p>
              <p><span className="text-gray-400">EasyPaisa:</span> {PAYMENT_DETAILS.easypaisa}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp number (optional)"
                className="w-full p-3 rounded bg-bg border border-gray-700"
              />
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Upload payment screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  className="w-full text-sm text-gray-300"
                  required
                />
              </div>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent text-black py-3 rounded-full font-semibold disabled:opacity-60"
              >
                {status === "sending" ? "Submitting..." : "Submit for Approval"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}