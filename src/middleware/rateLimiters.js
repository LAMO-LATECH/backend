import rateLimit from "express-rate-limit";

/*
   REGISTER LIMITER
   Prevents spam account creation
   5 requests per hour per IP
*/
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many accounts created. Try again later.",
  },
});

/*
   LOGIN LIMITER
   Prevent brute force password attacks
   5 attempts per 10 minutes per IP
*/
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});