import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateprofilepicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// To register a new user
router.route("/register").post(singleUpload, register);

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
  .put(isAuthenticated, singleUpload, updateprofilepicture);

// Forget password
router.route("/forgetpassword").post(forgetPassword);

// Forget password
router.route("/resetpassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

//Admin Router
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

//Change Role of User/Admin
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole);

export default router;
