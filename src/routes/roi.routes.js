// routes/roi.js
import express from "express";
import { verifyTokenAdmin } from "../middleware/authJwt.js"
import { createAndUpdate , getAllRates , calculate ,deleted} from "../controller/roi.Controller.js"

const router = express.Router();

// ➕ Add or update ROI rate
router.post("/", verifyTokenAdmin, createAndUpdate);

// 📋 Get all ROI rates
router.get("/", verifyTokenAdmin ,getAllRates );

// 🧮 Calculate ROI
router.post("/calculate", calculate );

router.delete("/:id", verifyTokenAdmin ,deleted );
export default router