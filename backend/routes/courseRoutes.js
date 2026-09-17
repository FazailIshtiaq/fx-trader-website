import express from "express";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { optionalAuth } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getCourses); // public, but content is filtered per visitor
router.post("/", protect, createCourse);    // admin only
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;