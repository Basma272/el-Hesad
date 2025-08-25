// models/RoiRate.js
import mongoose from "mongoose";

const RoiRateSchema = new mongoose.Schema({

  durationRange: { type: String, required: true }, 

  rate: { type: Number, required: true }         
});

export const RoiRateModel= mongoose.model("RoiRate", RoiRateSchema);