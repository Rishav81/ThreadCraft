import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage || "",
      },
    });
  } catch (err) {
    console.error("GET USER PROFILE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
