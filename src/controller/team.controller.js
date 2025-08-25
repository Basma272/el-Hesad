// routes/team.js
import express from "express";
import { TeamModel } from "../models/team.model.js";
import { asyncHandling } from "../utils/error-Handling.js";

const router = express.Router(); 
 
// ➕ Add new team member 
export const add_member = asyncHandling(async (req, res) => {
  const { name , role }= req.body
  const member = await TeamModel.create({
    name ,
     role ,
     image: req.file? `/uploads/${req.file.filename}` : null
  });
  res.status(201).json({ success: true, data: member });
});

// 📋 Get all team members
export const allTeam = asyncHandling(async (req, res) => {
  const { limit } = req.query
  const members = await TeamModel.find()
  .sort({ createdAt: -1 })
  .limit( Number(limit) || 0 );
  res.json({ success: true, count: members.length, data: members });
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