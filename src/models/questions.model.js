//الاساله الشائعه
//7️⃣ FAQ Schema

import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
  question: {
    en:{ type: String, required: true, },
    ar:{ type: String, required: true, }
  },

  answer: {
    en:{ type: String, required: true, },
    ar:{ type: String, required: true, }
  },
}, { timestamps: true });

export const QuestionsModel = mongoose.model("question", QuestionsSchema);
