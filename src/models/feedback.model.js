//اراء العملاء
//5️⃣ feedback Schema
// models/feedback.js
import mongoose from "mongoose";

const feedbacklSchema = new mongoose.Schema({

  username: { type: String, required: true }, 

  feedback:{ type: String, required: true },

  image: String,

  rating: { type: Number, min: 1, max: 5 }

}, { timestamps: true });

export const FeedbackModel = mongoose.model("feedback", feedbacklSchema);
