import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Requires a valid user token — blocks the request if missing/invalid.
export const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) return res.status(401).json({ message: "Please log in first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Session expired, please log in again" });
  }
};

// Doesn't block the request — just attaches req.user if a valid token is present.
// Used for public endpoints (like fetching videos) that behave differently for logged-in users.
export const optionalAuth = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch (error) {
    // invalid/expired token — just proceed as a logged-out visitor
  }
  next();
};