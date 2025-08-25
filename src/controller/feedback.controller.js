// routes/feedback.js
import express from "express";
import { FeedbackModel } from "../models/feedback.model.js";
import { asyncHandling } from "../utils/error-Handling.js";

const router = express.Router();

// ➕ Add new feedback
export const  Add_feedback  =asyncHandling(async (req, res) => {
  
  const feedback = await FeedbackModel.create(req.body);
  res.status(201).json({ success: true, data: feedback });
});

// 📋 Get all feedback
export const  get_feedback  =asyncHandling(async (req, res) => {
  const feedback = await FeedbackModel.find().sort({ createdAt: -1 });
  res.json({ success: true, count: feedback.length, data: feedback });
});


export default router;