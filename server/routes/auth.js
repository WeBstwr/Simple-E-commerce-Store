import express from "express";
import {
  register,
  login,
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile,
  updateUser,
  deleteUser
} from "../controllers/authController.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Profile management
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/profile/password", authenticate, changePassword);
router.delete("/profile", authenticate, deleteProfile);

// Admin-only test route
router.get("/admin-test", authenticate, requireAdmin, (req, res) => {
    res.json({ success: true, message: "You are an admin!" });
});

// Admin user management
router.get("/users", authenticate, requireAdmin, getAllUsers);
router.put("/users/:id", authenticate, requireAdmin, updateUser);
router.delete("/users/:id", authenticate, requireAdmin, deleteUser);

export default router; 