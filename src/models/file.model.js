// models/file.model.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true }, // image/pdf/video
  mimetype: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);