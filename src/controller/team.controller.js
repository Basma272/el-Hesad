// routes/team.js
import express from "express";
import { TeamModel } from "../models/team.model.js";
import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/response-Handling.js";
import { translate } from "../utils/translate.js"

const router = express.Router();

// ➕ Add new team member 
export const add_member = asyncHandling(async (req, res) => {
  const { name , role , linkedin }= req.body
  
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 

  const member = await TeamModel.create({
     name ,
      role,
      linkedin,
      image : imageUrl
  });
  res.status(201).json({ success: true, data: member });
});

// 📋 Get all team members
export const allTeam = asyncHandling(async (req, res) => {
        const lang =
    req.headers["accept-language"]?.toLowerCase().startsWith("ar")
      ? "ar"
      : "en";

  const { limit } = req.query

  const members = await TeamModel.find().lean()
  .sort({ createdAt: -1 })
  .limit( Number(limit) || 0 );

        const translated = translate(members , lang);
      
          sucssesResponse({
          res,
          data: translated
  })
});

// ✏️ Update team member
export const Update_member = asyncHandling(async (req, res) => {
  const updated = await TeamModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
  if (!updated) {
    return res.status(404).json({ success: false, message: "Team member not found" });
  }
  res.json({ success: true, data: updated });
});

// ❌ Delete team member
export const delete_member= asyncHandling(async (req, res) => {
  const deleted = await TeamModel.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Team member not found" });
  }
  res.json({ success: true, message: "Team member deleted" });
});

export default router;