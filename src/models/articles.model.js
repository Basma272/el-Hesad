// models/Article.js
import mongoose from "mongoose";

export const articleSchema = new mongoose.Schema({
  date: {  type: Date, required: true , match: /^\{4}-\d{2}-\d{2}$/ },
     
  author: { 
   en: {type: String, required: true },
   ar: {type: String, required: true }

  },
  title: { 
    en: {type: String, required: true },
    ar: {type: String, required: true }  
  },

  content: {
    en: {type: String, required: true },
    ar: {type: String, required: true }    
   },
  image:String
}, { timestamps: true });

export const ArticleModel= mongoose.model("Article", articleSchema);