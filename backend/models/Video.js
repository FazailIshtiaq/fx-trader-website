import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);