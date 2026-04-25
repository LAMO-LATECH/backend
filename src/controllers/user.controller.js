import {
  getProfile,
  updateProfile,
  getPreferences,
  updatePreferences,
} from "../services/user.service.js";

const getMe = async (req, res) => {
  try {
    const user = await getProfile(req.user.userId);
    res.status(200).json({ user });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await updateProfile(req.user.userId, req.body);
    res.status(200).json({ user });
  } catch (error) {
    const status = error.status || error;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const getMyPreferences = async (req, res) => {
  try {
    const preferences = await getPreferences(req.user.userId);
    res.status(200).json({ preferences });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const updateMyPreferences = async (req, res) => {
  const preferences = await updatePreferences(req.user.userId, req.body);
  res.status(200).json({ preferences });
  try {
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

export { getMe, updateMe, getMyPreferences, updateMyPreferences };
