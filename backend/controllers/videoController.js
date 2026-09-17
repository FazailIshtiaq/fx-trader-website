import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  const videos = await Video.find().sort({ order: 1 });
  res.json(videos);
};

export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
};

export const updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!video) return res.status(404).json({ message: "Not found" });
  res.json(video);
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};