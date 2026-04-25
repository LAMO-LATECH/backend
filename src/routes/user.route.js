import { Router } from "express";
import {
  getMe,
  updateMe,
  getMyPreferences,
  updateMyPreferences,
} from "../controllers/user.controller.js";

const router = Router();

// remove once we test the routes
// router.use(protect);

router.route("/me").get(getMe).patch(updateMe);
router
  .route("/me/preferences")
  .get(getMyPreferences)
  .patch(updateMyPreferences);

export default router;
