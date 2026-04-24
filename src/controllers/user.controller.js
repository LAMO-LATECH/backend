import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  console.log("hit register", req.body);
  try {
    const { email, password } = req.body;

    // basic validation
    if (!password || !email) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    // check if the user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    // create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "user registerd",
      user: { id: user._id, email: user.email, username: user.username },
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

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user)
      return res.status(400).json({
        message: "password or email may be incorrect",
      });

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "password or email be incorrect",
      });

    res.status(200).json({
      message: "user logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "oops sorry server error",
      error: error.message,
    });
  }
};
export { registerUser, loginUser };
