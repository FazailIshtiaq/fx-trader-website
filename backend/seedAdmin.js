// Run: node seedAdmin.js
// Creates the admin account using ADMIN_EMAIL / ADMIN_PASSWORD from .env.
// If an admin with that email already exists, it RESETS the password to match .env
// (safe to re-run any time you change ADMIN_PASSWORD).
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import mongoose from "mongoose";

dotenv.config();
connectDB();

const seed = async () => {
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

  if (existing) {
    existing.password = process.env.ADMIN_PASSWORD; // pre-save hook re-hashes it
    await existing.save();
    console.log("Existing admin found — password reset to match .env:", process.env.ADMIN_EMAIL);
  } else {
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("Admin created:", process.env.ADMIN_EMAIL);
  }
  mongoose.connection.close();
};

seed();