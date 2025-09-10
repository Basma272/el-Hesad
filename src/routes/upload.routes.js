import { Router } from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js";
import { upload, uploadVideo, uploadPdf, getVideos, getPdfs , deleteFile} from "../controller/file.controller.js";

const router = Router();

// 🎥 فيديو
router.post("/video", verifyTokenAdmin, upload.single("video"), uploadVideo);
router.get("/videos", getVideos);

// 📄 PDF
router.post("/pdf", verifyTokenAdmin, upload.single("pdf"), uploadPdf);
router.get("/pdfs", getPdfs);
// 🗑️ Delete أي ملف (Video / PDF)
router.delete("/:id", verifyTokenAdmin, deleteFile);


export default router;