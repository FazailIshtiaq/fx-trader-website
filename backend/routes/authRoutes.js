import express from "express";
import { loginAdmin, resetAdminPassword } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", loginAdmin);
router.get("/reset-admin", resetAdminPassword); // TEMPORARY — remove after use, see authController.js

export default router;