import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateprofilepicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// To register a new user
router.route("/register").post(register);

//Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);

// MyProfile
router.route("/me").get(isAuthenticated, getMyProfile);

// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// Update Profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateprofilepicture);

// Forget password
router.route("/forgetpassword").post(forgetPassword);

// Forget password
router.route("/resetpassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);




export default router;
