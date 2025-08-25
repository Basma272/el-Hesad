import { verifyTokenAdmin } from "../middleware/authJwt.js"
import express from "express";
import {
  createArticle,
  getArticlesList,
  getArticleDetails,
  updateArticle,
  deleteArticle,
  searchArticles
} from "../controller/articles.controller.js";

const router = express.Router();

// 📝 Create Article
router.post("/", verifyTokenAdmin, createArticle);

// 📃 Get Articles List (with optional limit)
router.get("/", getArticlesList);

// 🔍 Search Articles
router.get("/search", searchArticles);

// 📖 Get Article Details
router.get("/:id", getArticleDetails);

// ✏️ Update Article
router.put("/:id", verifyTokenAdmin, updateArticle);

// 🗑️ Delete Article
router.delete("/:id", verifyTokenAdmin, deleteArticle);

export default router;