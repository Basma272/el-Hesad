import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { 
        en: { type: String, required: true },
       ar: { type: String, required: true }
  },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

export const ProjectModel = mongoose.model("Project", ProjectSchema);
