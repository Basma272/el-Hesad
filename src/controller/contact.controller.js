// routes/feedback.js
import express from "express";
import { ContactModel } from "../models/contact.models.js";
import { asyncHandling } from "../utils/error-Handling.js";

const router = express.Router();

// ➕ Add new feedback
export const  Add_contact  =asyncHandling(async (req, res) => {
  const { username  , email , message } = req.body
  const contact = await ContactModel.create({
     username  , email , message
     });
  res.status(201).json({ success: true, data: contact });
});


// 📋 Get all feedback
export const  get_contact  =asyncHandling(async (req, res) => {
  const contact = await ContactModel.find().sort({ createdAt: -1 });
  res.json({ success: true, count: contact.length, data: contact });
});


export default router;