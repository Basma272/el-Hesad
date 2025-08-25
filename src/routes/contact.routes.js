// routes/contact.js
import express from "express";
import { Add_contact ,
        get_contact, 
        } from "../controller/contact.controller.js";
import { validate } from "../middleware/validation.js";

import {
contactVschema,
} from "../validation/Schema.validation.js";


const router = express.Router();

// ➕ Add new contact
router.post("/", validate(contactVschema) ,   Add_contact);

// 📋 Get all contact
router.get("/", get_contact );

export default router;