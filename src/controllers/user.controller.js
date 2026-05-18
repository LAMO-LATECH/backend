import {
  getProfile,
  updateProfile,
  getPreferences,
  updatePreferences,
  deleteAccount,
  getDestinations,
  upsertTypedDestination,
  addCustomDestination,
  updateCustomDestination,
  deleteDestination,
  getGamification,
  updateGamification,
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

const deleteMe = async (req, res) => {
  try {
    await deleteAccount(req.user.userId);
    res.status(204).send();
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const getMyDestinations = async (req, res) => {
  try {
    const destinations = await getDestinations(req.user.userId);
    res.status(200).json({ destinations });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const upsertMyTypedDestination = async (req, res) => {
  try {
    const { type } = req.params;
    if (type !== "home" && type !== "work") {
      return res.status(400).json({ message: "type must be home or work" });
    }
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "address is required" });
    }
    const destinations = await upsertTypedDestination(
      req.user.userId,
      type,
      address,
    );
    res.status(200).json({ destinations });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const addMyCustomDestination = async (req, res) => {
  try {
    const { label, address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "address is required" });
    }
    const destinations = await addCustomDestination(
      req.user.userId,
      label,
      address,
    );
    res.status(201).json({ destinations });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const updateMyDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destinations = await updateCustomDestination(
      req.user.userId,
      id,
      req.body,
    );
    res.status(200).json({ destinations });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const deleteMyDestination = async (req, res) => {
  try {
    const destinations = await deleteDestination(
      req.user.userId,
      req.params.id,
    );
    res.status(200).json({ destinations });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const getMyGamification = async (req, res) => {
  try {
    const gamification = await getGamification(req.user.userId);
    res.status(200).json({ gamification });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const updateMyGamification = async (req, res) => {
  try {
    const gamification = await updateGamification(req.user.userId, req.body);
    res.status(200).json({ gamification });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

export {
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
  getMyGamification,
  updateMyGamification,
};
