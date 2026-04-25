import { User } from "../models/user.model.js";
import { verifyAccessToken } from "../services/token.service.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      return res.status(401).json({ message: "invalid or expired token" });
    }

    const user = await User.findById(payload.userId).select("_id email role");

    if (!user) {
      return res.status(401).json({ message: "authorized" });
    }

    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "forbidden" });
  }
  next();
};

export { protect, requireAdmin };
