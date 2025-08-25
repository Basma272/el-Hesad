// routes/roi.js
import express from "express";
import { RoiRateModel } from "../models/roi-calculator.js";
import { asyncHandling } from "../utils/error-Handling.js";

const router = express.Router();

// ➕ Add or update ROI rate
export const createAndUpdate= asyncHandling(async (req, res) => {
  const { durationRange, rate } = req.body;
  if ( !durationRange || !rate ){
    res.status(400).json({
       message: "please enter durationRange and rate to calculate the return " 
       });
  }
  const updated = await RoiRateModel.findOneAndUpdate(
    { durationRange },
    { rate },
    { new: true, upsert: true }
  );
  res.json(updated);
});

// 📋 Get all ROI rates
export const getAllRates= asyncHandling(async (req, res) => {
  const rates = await RoiRateModel.find();
  res.json(rates);
});

// 🧮 Calculate ROI
export const calculate= asyncHandling(async (req, res) => {
  const { amount, durationRange } = req.body;
  const record = await RoiRateModel.findOne({ durationRange });

  if (!amount || !durationRange) {
    return res.status(400).json({ success: false, message: "Please enter amount and duration" });
  }

  if (!record) {
    return res.status(400).json({ success: false, message: "Invalid duration range" });
  }

  const rate = record.rate;
  const expectedReturn = amount + (amount * rate);
  const profit = expectedReturn - amount;

  res.json({
    success: true,
    amount,
    durationRange,
    rate,
    expectedReturn,
    profit
  });
});

export const deleted = asyncHandling(async (req, res) => {
  const rates = await RoiRateModel.findByIdAndDelete( req.params.id);
    if (!rates) {
    const error = new Error("This not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: "Done deleted" });
});
