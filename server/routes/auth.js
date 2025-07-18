import express from "express";
import { register, login } from "../controllers/authController.js";
import { getAllUsers } from "../controllers/authController.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Add protected profile route
router.get("/profile", authenticate, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Add admin-only test route
router.get("/admin-test", authenticate, requireAdmin, (req, res) => {
    res.json({ success: true, message: "You are an admin!" });
});

// Add admin-only route to get all users
router.get("/users", authenticate, requireAdmin, getAllUsers);

export default router; 