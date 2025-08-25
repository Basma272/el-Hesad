// routes/team.js
import express from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js"
import { add_member , Update_member , delete_member , allTeam } from "../controller/team.controller.js";
const upload = multer({ dest: "uploads/" });
import multer from "multer";

const router = express.Router();

// ➕ Add new team member
router.post("/",  
  //  verifyTokenAdmin , 
  upload.single("image"),
    add_member);

// 📋 Get all team members
router.get("/", allTeam);

// ✏️ Update team member
router.put("/:id", verifyTokenAdmin , Update_member);

// ❌ Delete team member
router.delete("/:id", verifyTokenAdmin, delete_member);

export default router;