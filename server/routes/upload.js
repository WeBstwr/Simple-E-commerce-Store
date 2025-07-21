import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads"));
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
      console.error("No file uploaded or Multer error");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    res.json({
      success: true,
      imagePath: `/uploads/${req.file.filename}`,
    });
  }
);

export default router; 