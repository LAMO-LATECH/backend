import { User } from "../models/user.model.js";
import {
  register,
  login,
  refresh,
  logout,
  googleAuth,
} from "../services/auth.service.js";

const registerUser = async (req, res) => {
  console.log("hit register", req.body);
  try {
    const { email, password } = req.body;

    // basic validation
    if (!password || !email) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    // register/create user
    const user = await register(email, password);

    res.status(201).json({
      message: "user registered",
      ...user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "oopsies sorry server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // check if the user already exists
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    const user = await login(email, password);

    res.status(200).json({
      message: "user logged in",
      ...user,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message || "oopsies server error",
    });
  }
};

const refreshUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refresh(refreshToken);
    res.status(200).json(tokens);
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    await logout(userId);
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};

export const googleAuthUser = async (req, res) => {
  try {
    const { idToken } = req.body;
    const result = await googleAuth(idToken);
    res.status(200).json({ message: "google auth success", ...result });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "oopsies server error" });
  }
};
export { registerUser, loginUser, refreshUser, logoutUser };
