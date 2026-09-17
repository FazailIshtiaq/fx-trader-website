import express from "express";
import {
  getSocials,
  createSocial,
  updateSocial,
  deleteSocial,
} from "../controllers/socialController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSocials);              // public - homepage reads this
router.post("/", protect, createSocial);  // admin only
router.put("/:id", protect, updateSocial);
router.delete("/:id", protect, deleteSocial);

export default router;
