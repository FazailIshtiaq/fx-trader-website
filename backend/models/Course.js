import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: String },
    // "Free" = visible to everyone. Any other value must exactly match a Service's title
    // (e.g. "Pro", "VIP") — only users approved for that exact plan can watch it.
    requiredPlan: { type: String, default: "Free" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);