import express from "express";
import { login } from "../controller/auth.controller.js";
import { validate } from "../middleware/validation.js";
import { loginVschema } from "../validation/Schema.validation.js";

const router = express.Router();

//  Auth Routes
router.post("/login", validate(loginVschema), login); 
export default router;
