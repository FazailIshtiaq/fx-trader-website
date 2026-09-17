import express from "express";
import {
  submitSubscription,
  getSubscriptions,
  updateSubscriptionStatus,
  deleteSubscription,
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";       // admin auth
import { protectUser } from "../middleware/userAuthMiddleware.js"; // regular user auth
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protectUser, upload.single("screenshot"), submitSubscription); // must be logged in
router.get("/", protect, getSubscriptions);                                       // admin only
router.put("/:id/status", protect, updateSubscriptionStatus);
router.delete("/:id", protect, deleteSubscription);

export default router;