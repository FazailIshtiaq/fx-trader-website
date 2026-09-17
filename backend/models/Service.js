import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    price: { type: String },   // e.g. "$49/mo" — shown in the subscribe modal
    features: [{ type: String }],
    buttonLabel: { type: String, default: "Learn More" },
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);