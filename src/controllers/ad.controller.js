import {
  getActiveAds,
  getAllAds,
  getAdById,
  getAdsByCategory,
  createAd,
  updateAd,
  setAdActive,
  deleteAd,
} from "../services/ad.service.js";

const getAds = async (req, res) => {
  try {
    const ads = await getActiveAds();
    res.status(200).json(ads);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const getAdminAds = async (req, res) => {
  try {
    const ads = await getAllAds();
    res.status(200).json(ads);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const getAd = async (req, res) => {
  try {
    const ad = await getAdById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json(ad);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const getAdsBycat = async (req, res) => {
  try {
    const ads = await getAdsByCategory(req.params.category);
    res.status(200).json(ads);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const createNewAd = async (req, res) => {
  try {
    const newAd = await createAd(req.body);
    res.status(201).json(newAd);
  } catch (error) {
    const status = error.status || 400;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const updateExistingAd = async (req, res) => {
  try {
    const ad = await updateAd(req.params.id, req.body);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json(ad);
  } catch (error) {
    const status = error.status || 400;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const toggleAdActive = async (req, res) => {
  try {
    const { active } = req.body;

    const ad = await setAdActive(req.params.id, active);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json(ad);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

const deleteExistingAd = async (req, res) => {
  try {
    await deleteAd(req.params.id);
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Server error" });
  }
};

export {
  getAds,
  getAdminAds,
  getAd,
  getAdsBycat,
  createNewAd,
  updateExistingAd,
  toggleAdActive,
  deleteExistingAd,
};