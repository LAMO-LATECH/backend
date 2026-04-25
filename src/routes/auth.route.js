import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from "../controllers/auth.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshUser);
router.route("/logout").post(logoutUser);
export default router;
