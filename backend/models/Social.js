import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    handle: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String },
    buttonLabel: { type: String, default: "Follow" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);
