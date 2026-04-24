import mongoose, { Schema } from "mongoose";

const userPreferencesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    notifications: {
      type: Boolean,
      default: false,
    },
    avoidTolls: {
      type: Boolean,
      default: false,
    },
    avoidHighways: {
      type: Boolean,
      default: false,
    },
    saved: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const UserPreferences = mongoose.model(
  "UserPreferences",
  userPreferencesSchema,
);
