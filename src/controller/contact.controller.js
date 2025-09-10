// routes/feedback.js
import express from "express";
import { ContactModel } from "../models/contact.models.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";


const router = express.Router();

// ➕ Add new contact
export const  Add_contact  =asyncHandling(async (req, res) => {
  const { username  , email , message } = req.body
  const contact = await ContactModel.create({
     username  , email , message
     });
  res.status(201).json({ success: true, data: contact });
});


// 📋 Get all contact
export const  get_contact  =asyncHandling(async (req, res) => {

  const contact = await ContactModel.find().sort({ createdAt: -1 });
    if (!contact) return res.status(404).json({ success: false, message: "Message not found" });

        
            sucssesResponse({
            res,
            data: contact,
            count: contact.length,
    })
});

// ✅ Mark message as read
export const readMessage= asyncHandling(async (req, res) => {
  const contact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    { isread: true },
    { new: true }
  );
  if (!contact) return res.status(404).json({ success: false, message: "Message not found" });
  res.json({ success: true, data: contact });
});


export default router;