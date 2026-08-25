import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import uploadToCloudinary from "../utils/uploadCloudinary.js";

export const registerAccount = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    // ============================================================
    // CHECK EXISTING USER
    // ============================================================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ============================================================
    // HASH PASSWORD
    // ============================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ============================================================
    // PROFILE IMAGE
    // ============================================================

    let profileImage = "";

    if (req.file) {
      profileImage = await uploadToCloudinary(req.file.buffer);
    }

    // ============================================================
    // CREATE USER
    // ============================================================

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImage,
    });

    // ============================================================
    // GENERATE JWT
    // ============================================================

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // ============================================================
    // SAVE TOKEN IN COOKIE
    // ============================================================

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginAccount = async (req, res) => {
  try {
    // 1. Get data from frontend
    const { email, password } = req.body;

    // 2. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Find user by email
    const existing = await User.findOne({ email });
    if (!existing) {
      return res.status(401).json({
        success: false,
        message: "Invalid email and password",
      });
    }

    // 4. Compare entered password with hashed password
    const comparedPassword = await bcrypt.compare(password, existing.password);
    if (!comparedPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email and password",
      });
    }

    // 5. Generate JWT token
    const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existing._id,
        fullName: existing.fullName,
        email: existing.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logoutAccount = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    `~`;

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
