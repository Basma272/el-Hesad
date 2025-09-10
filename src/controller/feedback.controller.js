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


  const feedback = await FeedbackModel.find().sort({ createdAt: -1 }).lean();
          
              sucssesResponse({
              res,
              data: feedback,
              count: feedback.length,
      })
});

// ✏️ Update feedback
export const update_feedback = asyncHandling(async (req, res) => {
  const { id } = req.params;
  const { username, feedback, rating } = req.body;

  let updateData = { username, feedback, rating };

  if (req.file) {
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    updateData.image = imageUrl;
  }

  const updated = await FeedbackModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: "Feedback not found" });
  }

  res.status(200).json({ success: true, data: updated });
});

// 🗑️ Delete feedback
export const delete_feedback = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const deleted = await FeedbackModel.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: "Feedback not found" });
  }

  res.status(200).json({ success: true, message: "Feedback deleted successfully" });
});
export default router;