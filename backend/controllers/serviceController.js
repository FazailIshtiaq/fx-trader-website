import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(services);
};

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!service) return res.status(404).json({ message: "Not found" });
  res.json(service);
};

export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
