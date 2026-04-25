import { User } from "../models/user.model.js";

const register = async (email, password) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw { status: 400, message: "Email is already in use!" };
  }

  const user = await User.create({
    email: email.toLowerCase(),
    password,
    loggedIn: false,
  });

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};
const login = async (email, password) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw { status: 400, message: "Email or password is incorrect" };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { status: 400, message: "Email or password is incorrect" };
  }

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};
export { register, login };
