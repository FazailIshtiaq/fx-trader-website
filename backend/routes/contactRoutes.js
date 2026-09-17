import express from "express";
import {
  submitContactForm,
  getMessages,
  markMessageRead,
  deleteMessage,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitContactForm);          // public - the website's contact form
router.get("/", protect, getMessages);         // admin only - view inbox
router.put("/:id/read", protect, markMessageRead);
router.delete("/:id", protect, deleteMessage);

export default router;