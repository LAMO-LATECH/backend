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
    returnDocument: "after",
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
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true },
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
    {
      returnDocument: "after",
      upsert: true,
      setDefaultOnInsert: true,
      runValidators: true,
    },
  );
  return preferences;
};

const getGamification = async (userId) => {
  const user = await User.findById(userId).select(
    "points routesAccepted badge streak",
  );
  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return {
    points: user.points,
    routesAccepted: user.routesAccepted,
    badge: user.badge,
    streak: user.streak,
  };
};

const updateGamification = async (userId, updates) => {
  const allowed = {};
  if (updates.points !== undefined) allowed.points = updates.points;
  if (updates.routesAccepted !== undefined)
    allowed.routesAccepted = updates.routesAccepted;
  if (updates.badge !== undefined) allowed.badge = updates.badge;
  if (updates.streak !== undefined) allowed.streak = updates.streak;

  const user = await User.findByIdAndUpdate(userId, allowed, {
    returnDocument: "after",
    runValidators: true,
  }).select("points routesAccepted badge streak");

  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return {
    points: user.points,
    routesAccepted: user.routesAccepted,
    badge: user.badge,
    streak: user.streak,
  };
};

const deleteAccount = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  await User.findByIdAndDelete(userId);
  await UserPreferences.deleteOne({ userId });
};

const getDestinations = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return user.savedDestinations;
};

const upsertTypedDestination = async (userId, type, address) => {
  const result = await User.findOneAndUpdate(
    { _id: userId, "savedDestinations.type": type },
    { $set: { "savedDestinations.$.address": address } },
    { returnDocument: "after" },
  );

  if (result) {
    return result.savedDestinations;
  }

  const updated = await User.findByIdAndUpdate(
    userId,
    { $push: { savedDestinations: { type, address } } },
    { returnDocument: "after" },
  );

  if (!updated) {
    throw { status: 404, message: "user not found" };
  }
  return updated.savedDestinations;
};

const addCustomDestination = async (userId, label, address) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { savedDestinations: { type: "custom", label, address } } },
    { returnDocument: "after" },
  );
  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return user.savedDestinations;
};

const updateCustomDestination = async (userId, destId, updates) => {
  const setFields = {};
  if (updates.label !== undefined) {
    setFields["savedDestinations.$.label"] = updates.label;
  }
  if (updates.address !== undefined) {
    setFields["savedDestinations.$.address"] = updates.address;
  }

  const user = await User.findOneAndUpdate(
    { _id: userId, "savedDestinations._id": destId },
    { $set: setFields },
    { returnDocument: "after" },
  );
  if (!user) {
    throw { status: 404, message: "destination not found" };
  }
  return user.savedDestinations;
};

const deleteDestination = async (userId, destId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedDestinations: { _id: destId } } },
    { returnDocument: "after" },
  );
  if (!user) {
    throw { status: 404, message: "user not found" };
  }
  return user.savedDestinations;
};

export {
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
};
