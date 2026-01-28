import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    gender: { type: String, enum: ["Male", "Female"] },
    status: String,
    location: String,
    profileImage: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);
