// routes/projects.js
import express from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js";
import { createprojects , getallprojects , updateprojects , deleteprojects} from "../controller/projects.controller.js"

const router = express.Router();

// ➕ إضافة مشروع
router.post("/", verifyTokenAdmin, createprojects );

// 📋 عرض كل المشاريع
router.get("/", getallprojects );

// ✏️ تعديل مشروع
router.put("/:id", verifyTokenAdmin, updateprojects );

// ❌ حذف مشروع
router.delete("/:id", verifyTokenAdmin, deleteprojects );

export default router;