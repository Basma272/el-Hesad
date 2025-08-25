// routes/feedback.js
import express from "express";
import { Add_feedback ,
        get_feedback,  
        } from "../controller/feedback.controller.js";

        
import { validate } from "../middleware/validation.js";

import {
feedbackVschema,

} from "../validation/Schema.validation.js";


const router = express.Router();

// ➕ Add new feedback
router.post("/", validate (feedbackVschema) , Add_feedback);

// 📋 Get all feedback
router.get("/", get_feedback );

export default router;   