import express from "express";
import multer from "multer";
import path from "path";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "server/uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// Only admin can upload product images
router.post(
  "/product-image",
  authenticate,
  requireAdmin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
      success: true,
      imagePath: `/uploads/${req.file.filename}`,
    });
  }
);

export default router; 