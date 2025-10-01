// models/RoiRate.js
import mongoose from "mongoose";

const RoiRateSchema = new mongoose.Schema(
  {
    name_tree: { 
      type: String, 
      required: true, 
      unique: true // عشان ما يتكررش نفس الاسم
    }, 
    cost_per_feddan: { 
      type: Number, 
      required: true 
    },
    max_feddan: { 
      type: Number, 
      required: true 
    },
      capital :{ type:Number, requires: true },
    // نسب الربح لكل سنة (Array ديناميكي)

    feddan_rule: {
      type:String,
      enum:["integer", "one_and_half"],
      default:"integer",
    },
    yearly_rates: {
      type: [Number],
      required: true,
      default: []
    }

  },
  { timestamps: true }
);

export const RoiRateModel = mongoose.model("RoiRate", RoiRateSchema);