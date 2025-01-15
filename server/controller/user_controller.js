import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadResponse } from "../utils/cloudinary.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    }

    const checkUserAllready = await User.findOne({ email });
    if (checkUserAllready) {
      return res.status(401).json({
        success: false,
        message: "user already register",
      });
    }
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const registerUser = await User.create({
      name,
      email,
      password: hashpassword,
    });

    return res.status(200).json({
      success: true,
      message: "user register successfully",
      registerUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Compare the password with the stored hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }

    // Create JWT token
    const jsonToken = jwt.sign({ userId: user._id }, process.env.SECRATE_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    console.log(jsonToken);

    // Set the JWT token in the cookie
    return res
      .status(200)
      .cookie("token", jsonToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: "successfully log in",
        user,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    success: true,
    message: "user successfully logout",
  });
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "user profile get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userID = req.id;
    const { name } = req.body;
    const profilePhoto = req.file.path || req.file;

    if (!req.file.path || !req.file) {
      return res.status(401).json({
        success: false,
        message: "profilePhoto is required",
        profilePhoto,
      });
    }
    const cloudinaryData = await uploadResponse(profilePhoto);
    console.log(cloudinaryData + "kjndkj");
    const user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const update = { name, photoUrl: cloudinaryData.secure_url };

    const updateUser = await User.findByIdAndUpdate(userID, update, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "profile update successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userMialSend = async (req, res) => {
  const { email } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // Or another service like Yahoo, Outlook
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "hello this is check mailer",
      text: "jashvendra chauhan try to create mailer for whenever need to send mail it can be send by this mailer ",
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "mail has benn sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};
