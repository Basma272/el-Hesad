// routes/projects.js
import express from "express";
import { ProjectModel } from "../models/projects.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";

const router = express.Router();

// ➕ إضافة مشروع
export const createprojects = asyncHandling(async (req, res) => {
  const { title, location } = req.body
    
      const existitle = await ProjectModel.findOne({ title })
      if (existitle){ 
         res.status(409).json({ message:"This project title already exists" }); 
        } else{
              const project = await ProjectModel.create ({ title,  location });
           res.status(201).json(project);
         }
  

});

// 📋 عرض كل المشاريع
import { translate } from "../utils/translate.js";

export const getallprojects = asyncHandling(async (req, res) => {
  const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();

  const translatedProjects = translate(projects, lang);

  sucssesResponse({
    res,
    success: true,
    message: "✅ Projects fetched successfully",
    data: translatedProjects,
  });
});

// ✏️ تعديل مشروع
export const updateprojects = asyncHandling(async (req, res) => {
  const updated = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  res.json(updated);
});

// ❌ حذف مشروع
export const deleteprojects = asyncHandling(async (req, res) => {
  const deleted = await ProjectModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: "Project deleted" });
});

export default router;