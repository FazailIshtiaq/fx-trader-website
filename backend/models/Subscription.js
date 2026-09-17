import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },   // snapshot of the user's name at request time
    email: { type: String, required: true },  // snapshot of the user's email at request time
    whatsapp: { type: String },
    planTitle: { type: String, required: true },   // e.g. "Pro", "VIP"
    planPrice: { type: String },                     // e.g. "$49/mo" (snapshot at time of request)
    screenshotUrl: { type: String, required: true }, // path to uploaded payment proof
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);