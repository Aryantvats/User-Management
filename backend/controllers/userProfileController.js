import UserProfile from "../models/UserProfile.js";
import { Parser } from "json2csv";


export const createProfile = async (req, res) => {
  try {
    const profile = await UserProfile.create({
      ...req.body,
      createdBy: req.user._id,
      profileImage: req.file?.path || null,
    });

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProfiles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const profiles = await UserProfile.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    const total = await UserProfile.countDocuments();

    res.status(200).json({
      success: true,
      data: profiles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.profileImage = req.file.path;
    }

    const profile = await UserProfile.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      data,
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const searchProfiles = async (req, res) => {
  try {
    const q = req.query.q || "";

    const profiles = await UserProfile.find({
      createdBy: req.user._id,
      $or: [
        { firstName: { $regex: q, $options: "i" } },
        { lastName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const exportProfilesToCSV = async (req, res) => {
  try {
    const profiles = await UserProfile.find({
      createdBy: req.user._id,
    }).lean();

    const fields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "gender",
      "status",
      "location",
      "createdAt",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(profiles);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=user_profiles.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
