import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
      default: "angeleno",
    },
    password: {
      type: String,
      required: [
        function () {
          return this.authProvider === "local";
        },
        "Password is required for local accounts",
      ],
      select: false,
      minLength: 8,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    picture: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    routesAccepted: {
      type: Number,
      default: 0,
      min: 0,
    },
    badge: {
      type: String,
      enum: ["none", "bronze", "silver", "gold"],
      default: "none",
    },
    streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {
      type: String,
      select: false,
    },
    refreshTokenExpiry: {
      type: Date,
      select: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    savedDestinations: [
      {
        type: {
          type: String,
          enum: ["home", "work", "custom"],
          required: true,
        },
        label: { type: String },
        address: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedAt" },
  },
);

// hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
