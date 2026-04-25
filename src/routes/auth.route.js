import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshUser);
router.route("/logout").post(protect, logoutUser);
export default router;
