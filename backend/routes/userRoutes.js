import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectUser, getMe);

export default router;