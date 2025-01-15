import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
  userMialSend,
} from "../controller/user_controller.js";
import isAuthenticate from "../middleware/isAuthenticate.js";

import { upload } from "../utils/multer.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/userget").get(isAuthenticate, getUserProfile);
router .route("/profile/profileUpdate").put(isAuthenticate, upload, updateProfile);
router .route("/userMailer").post(userMialSend)

export default router;
