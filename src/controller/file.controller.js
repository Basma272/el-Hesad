import multer from "multer";
import File from "../models/file.model.js";
import path from "path"
import fs from "fs"

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const upload = multer({ storage });

// 🎥 رفع فيديو
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No video uploaded" });

    const videoUrl =`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const video = await File.create({
      filename: req.file.filename,
      url: videoUrl,
      type: "video",
    });

    res.json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📄 رفع PDF
export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No PDF uploaded" });

    const pdfUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const pdf = await File.create({
      filename: req.file.filename,
      url: pdfUrl,
      type: "pdf",
    });

    res.json({ success: true, data: pdf });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🎥 GET كل الفيديوهات
export const getVideos = async (req, res) => {
  try {
    const videos = await File.find({ type: "video" }).sort({ createdAt: -1 });
    res.json({ success: true, count: videos.length, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📄 GET كل الـ PDFs
export const getPdfs = async (req, res) => {
  try {
    const pdfs = await File.find({ type: "pdf" }).sort({ createdAt: -1 });
    res.json({ success: true, count: pdfs.length, data: pdfs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 🗑️ حذف ملف (Video / PDF)
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // ندور على الفايل في MongoDB
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    // نمسحه من uploads
    const filePath = path.join("uploads", file.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting from uploads:", err);
      }
    });

    // نمسحه من DB
    await file.deleteOne();

    res.json({ success: true, message: `${file.type} deleted successfully `});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};