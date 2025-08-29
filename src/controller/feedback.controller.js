// routes/feedback.js
import express from "express";
import { FeedbackModel } from "../models/feedback.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";
import { translate } from "../utils/translate.js"

const router = express.Router();

// ➕ Add new feedback
export const  Add_feedback  =asyncHandling(async (req, res) => {
  const  {  username , feedback , image , rating } = req.body
  
      if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 
  
        const feedbackk = await FeedbackModel.create({
          username, feedback , image : imageUrl, rating
        });

  res.status(201).json({ success: true, data: feedbackk });
});

// 📋 Get all feedback
export const  get_feedback  =asyncHandling(async (req, res) => {
       const lang =
      req.headers["accept-language"]?.toLowerCase().startsWith("ar")
        ? "ar"
        : "en";

  const feedback = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
    const translated = translate(feedback , lang);
          
              sucssesResponse({
              res,
              data: translated,
              count: feedback.length,
      })
});


export default router;