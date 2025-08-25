// models/Article.js
import mongoose from "mongoose";

export const articleSchema = new mongoose.Schema({
  date: { type: Date, required: true , match: /^\{4}-\d{2}-\d{2}$/}, 
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String }
}, { timestamps: true });

export const ArticleModel= mongoose.model("Article", articleSchema);