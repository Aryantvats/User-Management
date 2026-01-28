import express from "express";
import { changePassword, getMe, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../schema/authSchema.js";
import { loginSchema } from "../schema/authSchema.js";
import { changePasswordSchema } from "../schema/authSchema.js";

const authRoutes = express.Router();

authRoutes.post("/register",validate(registerSchema), registerUser);
authRoutes.post("/login", validate(loginSchema), loginUser);
authRoutes.get("/me",protect, getMe);
authRoutes.put("/change-password",protect, validate(changePasswordSchema), changePassword);

export default authRoutes;