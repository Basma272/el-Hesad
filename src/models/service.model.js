// الخدمات
import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  
  },


}, { timestamps: true });

export const ServiceModel = mongoose.model("Service", serviceSchema);

