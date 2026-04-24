import mongoose, { Schema } from "mongoose";
import bcyrpt from "bcrypt";

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
      required: true,
      select: false,
      minLength: 8,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
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
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedAt" },
  },
);

// before saving any password we need to hash it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcyrpt.hash(this.password, 10);
  next();
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcyrpt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
