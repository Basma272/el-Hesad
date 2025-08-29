// routes/feedback.js
import express from "express";
import { ContactModel } from "../models/contact.models.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";
import { translate } from "../utils/translate.js"


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
     const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";
  const contact = await ContactModel.find().lean().sort({ createdAt: -1 });

  const translated = translate(contact , lang);
        
            sucssesResponse({
            res,
            data: translated,
            count: contact.length,
    })
});


export default router;