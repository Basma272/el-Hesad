import { verifyTokenAdmin } from "../middleware/authJwt.js"
import express from "express";
import {
  createArticle,
  getArticlesList,
  updateArticle,
  deleteArticle,
  searchArticles
} from "../controller/articles.controller.js";
const router = express.Router();

        import  {upload} from "../controller/file.controller.js"

//📝 Create Article
router.post("/", verifyTokenAdmin,
  upload.single("image"), 
   createArticle);

// 📃 Get Articles List (with optional limit)
router.get("/", getArticlesList);

// 🔍 Search Articles
router.get("/search", searchArticles);

// ✏️ Update Article
router.put("/:id", verifyTokenAdmin,  upload.single("image") ,updateArticle);

// 🗑️ Delete Article
router.delete("/:id", verifyTokenAdmin, deleteArticle);

export default router;