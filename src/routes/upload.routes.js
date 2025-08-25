import { Router } from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js";
import multer from "multer";

const router = Router();

// إعداد Multer لتخزين الصور في uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 📌 رفع صورة واحدة
router.post("/image", verifyTokenAdmin ,upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, url: imageUrl });
});


router.post("/video", verifyTokenAdmin  ,upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No video uploaded" });

  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, url: videoUrl });
});

export default router;
