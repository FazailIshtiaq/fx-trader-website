import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// TEMPORARY, secret-protected reset endpoint — creates/resets the admin account
// to match ADMIN_EMAIL/ADMIN_PASSWORD from .env, without needing shell/CLI access.
// Protected by RESET_SECRET so randoms can't hit this and hijack your admin account.
// ⚠️ Remove this route (and its entry in authRoutes.js) once you've used it.
export const resetAdminPassword = async (req, res) => {
  const { secret } = req.query;

  if (!process.env.RESET_SECRET || secret !== process.env.RESET_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

  if (existing) {
    existing.password = process.env.ADMIN_PASSWORD; // pre-save hook re-hashes it
    await existing.save();
    return res.json({ message: `Password reset for ${process.env.ADMIN_EMAIL}` });
  }

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  res.json({ message: `Admin created: ${process.env.ADMIN_EMAIL}` });
};