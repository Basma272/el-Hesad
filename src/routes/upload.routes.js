import { Router } from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

let lastVideo = null;
let lastPdf = null;

export const upload = multer({ storage });

// 📌 رفع فيديو
router.post("/video", verifyTokenAdmin, upload.single("video"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "No video uploaded" });

  const videoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  lastVideo = videoUrl;
  res.json({ success: true, url: videoUrl });
});

// 📌 رفع PDF
router.post("/pdf", verifyTokenAdmin, upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "No file uploaded" });

  const fileUrl =` ${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  lastPdf = fileUrl;
  res.json({ success: true, url: fileUrl, type: req.file.mimetype });
});

// 📌 GET الفيديو
router.get("/video", (req, res) => {
  if (!lastVideo)
    return res.status(404).json({ success: false, message: "No video uploaded yet" });
  res.json({ success: true, url: lastVideo });
});

// 📌 GET الـ PDF
router.get("/pdf", (req, res) => {
  if (!lastPdf)
    return res.status(404).json({ success: false, message: "No PDF uploaded yet" });
  res.json({ success: true, url: lastPdf });
});

// 📌 DELETE الفيديو
router.delete("/video", verifyTokenAdmin, (req, res) => {
  if (!lastVideo)
    return res.status(404).json({ success: false, message: "No video to delete" });

  const filePath = path.join("uploads", path.basename(lastVideo));
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ success: false, message: "Error deleting video" });

    lastVideo = null;
    res.json({ success: true, message: "Video deleted successfully" });
  });
});

// 📌 DELETE الـ PDF
router.delete("/pdf", verifyTokenAdmin, (req, res) => {
  if (!lastPdf)
    return res.status(404).json({ success: false, message: "No PDF to delete" });

  const filePath = path.join("uploads", path.basename(lastPdf));
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ success: false, message: "Error deleting PDF" });

    lastPdf = null;
    res.json({ success: true, message: "PDF deleted successfully" });
  });
});

export default router;