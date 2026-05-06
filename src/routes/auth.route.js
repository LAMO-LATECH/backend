import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  googleAuthUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { registerLimiter, loginLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.route("/register").post(registerLimiter, registerUser);
router.route("/login").post(loginLimiter, loginUser);
router.route("/refresh").post(refreshUser);
router.route("/logout").post(protect, logoutUser);
router.route("/google").post(loginLimiter, googleAuthUser);

export default router;
