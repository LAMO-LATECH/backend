import { User } from "../models/user.model.js";
import { UserPreferences } from "../models/userPreferences.model.js";

const getProfile = async (userId) => {
  const user = await User.findById(userId).select(
    "-password -refreshToken -refreshTokenExpiry",
  );
  if (!user) {
    throw {
      status: 404,
      message: "user not found",
    };
  }
  return user;
};

const updateProfile = async (userId, updates) => {
  const allowed = {};
  if (updates.username !== undefined) {
    allowed.username = updates.username;
  }
  if (updates.picture !== undefined) {
    allowed.picture = updates.picture;
  }

  const user = await User.findByIdAndUpdate(userId, allowed, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken -refreshTokenExpiry");

  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return user;
};

const getPreferences = async (userId) => {
  const prefs = await UserPreferences.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  return prefs;
};

const updatePreferences = async (userId, updates) => {
  const allowed = {};
  if (updates.notifications !== undefined) {
    allowed.notifications = updates.notifications;
  }
  if (updates.avoidTolls !== undefined) {
    allowed.avoidTolls = updates.avoidTolls;
  }
  if (updates.avoidHighways !== undefined) {
    allowed.avoidHighways = updates.avoidHighways;
  }
  if (updates.saved !== undefined) {
    allowed.saved = updates.saved;
  }

  const preferences = await UserPreferences.findOneAndUpdate(
    { userId },
    { $set: allowed, $setOnInsert: { userId } },
    { new: true, upsert: true, setDefaultOnInsert: true, runValidators: true },
  );
  return preferences;
};
