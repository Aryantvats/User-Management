import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  searchProfiles,
  exportProfilesToCSV,
  updateStatus,
  createProfilesBulk,
} from "../controllers/userProfileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { userProfileSchema } from "../schema/userProfileSchema.js";

const userProfileRoutes = express.Router();

userProfileRoutes.use(protect);

userProfileRoutes.post("/", upload.single("profileImage"), validate(userProfileSchema), createProfile);
userProfileRoutes.put("/:id", upload.single("profileImage"), validate(userProfileSchema), updateProfile);

userProfileRoutes.get("/", getProfiles);
userProfileRoutes.get("/search", searchProfiles);
userProfileRoutes.get("/export", exportProfilesToCSV);
userProfileRoutes.get("/:id", getProfileById);
userProfileRoutes.delete("/:id", deleteProfile);
userProfileRoutes.patch("/:id/status", updateStatus);

userProfileRoutes.post("/bulk", createProfilesBulk);

export default userProfileRoutes;
