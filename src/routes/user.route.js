import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMe,
  updateMe,
  getMyPreferences,
  updateMyPreferences,
  deleteMe,
  getMyDestinations,
  upsertMyTypedDestination,
  addMyCustomDestination,
  updateMyDestination,
  deleteMyDestination,
} from "../controllers/user.controller.js";

const router = Router();

router.use(protect);

router.route("/me").get(getMe).patch(updateMe).delete(deleteMe);
router
  .route("/me/preferences")
  .get(getMyPreferences)
  .patch(updateMyPreferences);

router
  .route("/me/destinations")
  .get(getMyDestinations)
  .post(addMyCustomDestination);
router.route("/me/destinations/:type").put(upsertMyTypedDestination);
router
  .route("/me/destinations/:id")
  .patch(updateMyDestination)
  .delete(deleteMyDestination);

export default router;
