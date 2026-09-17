import Social from "../models/Social.js";

export const getSocials = async (req, res) => {
  const socials = await Social.find().sort({ order: 1 });
  res.json(socials);
};

export const createSocial = async (req, res) => {
  const social = await Social.create(req.body);
  res.status(201).json(social);
};

export const updateSocial = async (req, res) => {
  const social = await Social.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!social) return res.status(404).json({ message: "Not found" });
  res.json(social);
};

export const deleteSocial = async (req, res) => {
  const social = await Social.findByIdAndDelete(req.params.id);
  if (!social) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
