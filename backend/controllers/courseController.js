import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  const courses = await Course.find().sort({ order: 1 });
  const userPlan = req.user?.approvedPlan || null; // set by optionalAuth if logged in

  const result = courses.map((c) => {
    const plain = c.toObject();
    const isFree = !plain.requiredPlan || plain.requiredPlan === "Free";
    const hasAccess = isFree || userPlan === plain.requiredPlan;

    if (!hasAccess) {
      return { ...plain, videoUrl: null, locked: true };
    }
    return { ...plain, locked: false };
  });

  res.json(result);
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) return res.status(404).json({ message: "Not found" });
  res.json(course);
};

export const deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};