import { Router } from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});


export const upload = multer ({ storage })

router.post("/video", verifyTokenAdmin  ,upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No video uploaded" });

  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, url: videoUrl });
});

// 📌 رفع PDF أو فيديو
router.post("/pdf", verifyTokenAdmin, upload.single("file"), (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl, type: req.file.mimetype });
});

export default router;