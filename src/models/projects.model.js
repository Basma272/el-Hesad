import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

export const ProjectModel = mongoose.model("Project", ProjectSchema);
