// الخدمات
import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  image: { type: String }, // لو عندك صورة
}, { timestamps: true });

export const ServiceModel = mongoose.model("Service", serviceSchema);

