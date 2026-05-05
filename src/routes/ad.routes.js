import { Router } from "express";
import { protect, requireAdmin } from "src/middleware/auth.middleware.js";
import {
  getAds,
  getAdminAds,
  getAd,
  getAdsBycat,
  createNewAd,
  updateExistingAd,
  toggleAdActive,
  deleteExistingAd,
} from "../controllers/ad.controller.js";

const router = Router();

router.route("/").get(getAds);

router.route("/all").get(protect, requireAdmin, getAdminAds);

router.route("/category/:category").get(getAdsBycat);

router.route("/:id").get(getAd);

router.route("/").post(protect, requireAdmin, createNewAd);

router.route("/:id").put(protect, requireAdmin, updateExistingAd);

router.route("/:id/active").patch(protect, requireAdmin, toggleAdActive);

router.route("/:id").delete(protect, requireAdmin, deleteExistingAd);

export default router;