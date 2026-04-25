import { User } from "../models/user.model.js";
import { register, login } from "../services/auth.service.js";

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
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "oops sorry server error", error: error.message });
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
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "oops sorry server error",
      error: error.message,
    });
  }
};
export { registerUser, loginUser };
