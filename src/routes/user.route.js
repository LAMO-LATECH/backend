import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMe,
  updateMe,
  getMyPreferences,
  updateMyPreferences,
} from "../controllers/user.controller.js";

const router = Router();

router.use(protect);

router.route("/me").get(getMe).patch(updateMe);
router
  .route("/me/preferences")
  .get(getMyPreferences)
  .patch(updateMyPreferences);

export default router;
