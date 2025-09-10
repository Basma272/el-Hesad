// routes/feedback.js
import express from "express";
import { Add_feedback , get_feedback, update_feedback  ,delete_feedback } from "../controller/feedback.controller.js";
import { verifyTokenAdmin } from "../middleware/authJwt.js"
import { validate } from "../middleware/validation.js";
import { feedbackVschema } from "../validation/Schema.validation.js";
        import  {upload} from "../controller/file.controller.js"


const router = express.Router();

// ➕ Add new feedback
router.post("/", validate (feedbackVschema)  ,   verifyTokenAdmin , 
  upload.single("image"), Add_feedback);

// 📋 Get all feedback
router.get("/", get_feedback );
router.put("/:id",  verifyTokenAdmin , upload.single("image"), update_feedback); // ✏️ تعديل feedback
router.delete("/:id",   verifyTokenAdmin , delete_feedback);                      // 🗑️ مسح feedback


export default router;   