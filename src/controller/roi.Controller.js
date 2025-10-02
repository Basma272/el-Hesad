// routes/roi.js
import express from "express";
import { RoiRateModel } from "../models/roi-calculator.js";
import { asyncHandling } from "../utils/error-Handling.js";

const router = express.Router();

// ➕ Add or update ROI rate
export const createAndUpdate = asyncHandling(async (req, res) => {
  const { name_tree, cost_per_feddan, max_feddan, feddan_rule, yearly_rates } = req.body;

  if (!name_tree || !cost_per_feddan || !max_feddan || !yearly_rates) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
    });
  }

  const updated = await RoiRateModel.findOneAndUpdate(
    { name_tree }, // الشرط
    { cost_per_feddan, max_feddan, feddan_rule, yearly_rates }, // الحقول
    { new: true, upsert: true }
  );

  res.json(updated);
});

// 📋 Get all ROI rates
export const getAllRates = asyncHandling(async (req, res) => {
  const rates = await RoiRateModel.find();
  res.json(rates);
});

export const calculate = asyncHandling(async (req, res) => {
  const { capital, name_tree, years } = req.body;

  if (!capital || !name_tree  || !years) {
    return res.status(400).json({
      success: false,
      message: "Please enter capital, name_tree and years",
    });
  }

  const record = await RoiRateModel.findOne({ name_tree });
  if (!record) {
    return res.status(400).json({
      success: false,
      message: "Invalid name_tree",
    });
  }

  const { yearly_rates, cost_per_feddan, max_feddan, allocationType } = record;

  // 🧮 حساب الفدادين
  let feddans = capital / cost_per_feddan;

  if (allocationType === "integer") {
    feddans = Math.floor(feddans);
  } else if (allocationType === "half") {
    feddans = Math.floor(feddans);
    if (capital / cost_per_feddan - feddans >= 0.5) {
      feddans += 0.5;
    }
  } else if (allocationType === "any") {
    feddans = Math.round(feddans * 2) / 2;
  }

  if (feddans > max_feddan) feddans = max_feddan;

  // 📈 حساب العوائد حسب عدد السنين اللي المستخدم اختارها
  let yearlyReturns = [];
  let cumulative = 0;

  for (let i = 0; i < years; i++) {
    const year = i + 1;
    // لو مفيش نسبة للـ year ده، ناخد آخر نسبة موجودة
    const rate = yearly_rates[i] ?? yearly_rates[yearly_rates.length - 1];
    const expected = capital * (1 + rate);
    const profit = expected - capital;
    cumulative += profit;
    yearlyReturns.push({ year, rate, expected, profit, cumulative });
  }

  res.json({
    success: true,
    name_tree,
    capital,
    years,
    feddans,
    allocationType,
    yearlyReturns,
  });
});

// 🗑 Delete tree record
export const deleted = asyncHandling(async (req, res) => {
  const rates = await RoiRateModel.findByIdAndDelete(req.params.id);
  if (!rates) {
    const error = new Error("This record not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: "Deleted successfully" });
});

export default router;