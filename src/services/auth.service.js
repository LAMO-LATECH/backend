import crypto from "crypto";
import { User } from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./token.service.js";
import { access } from "fs";

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const issueTokenForUsers = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = hashToken(refreshToken);
  user.refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
  await user.save();

  return { accessToken, refreshToken };
};

const register = async (email, password) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw { status: 400, message: "Email is already in use!" };
  }

  const user = await User.create({
    email: email.toLowerCase(),
    password,
  });

  const { accessToken, refreshToken } = await issueTokenForUsers(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  };
};
const login = async (email, password) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw { status: 401, message: "Email or password is incorrect" };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { status: 401, message: "Email or password is incorrect" };
  }

  const { accessToken, refreshToken } = await issueTokenForUsers(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  };
};

const refresh = async (incomingToken) => {
  if (!incomingToken) {
    throw { status: 401, message: "Refresh token required" };
  }

  let payload;
  try {
    payload = verifyRefreshToken(incomingToken);
  } catch (error) {
    throw { status: 401, message: "invalid or expired refresh token" };
  }

  const user = await User.findById(payload.userId).select(
    "+refreshToken +refreshTokenExpiry",
  );

  if (!user || !user.refreshToken || !user.refreshTokenExpiry) {
    throw { status: 401, message: "invalid refresh token" };
  }

  const incomingHash = hashToken(incomingToken);
  if (incomingHash !== user.refreshToken) {
    throw { status: 401, message: "invalid refresh token" };
  }

  if (user.refreshTokenExpiry.getTime() < Date.now()) {
    throw { status: 401, message: "Refresh token expired" };
  }

  const { accessToken, refreshToken } = await issueTokenForUsers(user);
  return { accessToken, refreshToken };
};

const logout = async (userId) => {
  const user = await User.findById(userId).select(
    "+refreshToken +refreshTokenExpiry",
  );

  if (!user) {
    throw { status: 404, message: "user not found" };
  }

  user.refreshToken = null;
  user.refreshTokenExpiry = null;
  await user.save();
};
export { register, login, refresh, logout, hashToken, issueTokenForUsers };
