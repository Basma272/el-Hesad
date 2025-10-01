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

// 🧮 Calculate ROI
export const calculate = asyncHandling(async (req, res) => {
  const { capital, name_tree } = req.body;

  if (!capital || !name_tree) {
    return res.status(400).json({
      success: false,
      message: "Please enter capital and name_tree",
    });
  }

  const record = await RoiRateModel.findOne({ name_tree });
  if (!record) {
    return res.status(400).json({
      success: false,
      message: "Invalid name_tree",
    });
  }

  const { yearly_rates, cost_per_feddan, max_feddan, feddan_rule } = record;

  // 🧮 حساب الفدادين من رأس المال
  let feddans = capital / cost_per_feddan;
  if (feddans > max_feddan) feddans = max_feddan;

  switch (feddan_rule) {
    case "integer":
      feddans = Math.floor(feddans);
      break;

    case "one-and-half":
      if (feddans <= 1.5) {
        feddans = feddans <= 1 ? 1 : 1.5;
      } else {
        feddans = Math.floor(feddans);
      }
      break;
  }

  // 📈 حساب العوائد لكل سنة (لحد 15 سنة)
  let yearlyReturns = [];
  let cumulative = 0;

  for (let year = 1; year <= 15; year++) {
    let rate = yearly_rates[year - 1];

    // لو النسبة مش موجودة ناخد آخر واحدة
    if (rate === undefined && yearly_rates.length > 0) {
      rate = yearly_rates[yearly_rates.length - 1];
    }

    const expected = capital * (1 + rate);
    const profit = expected - capital;
    cumulative += profit;

    yearlyReturns.push({
      year,
      rate,
      expected,
      profit,
      cumulative,
    });
  }

  res.json({
    success: true,
    name_tree,
    capital,
    feddans,
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