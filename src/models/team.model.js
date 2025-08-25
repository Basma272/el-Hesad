//6️⃣ TeamMember Schema فريق العمل 
// models/Team.js
import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: String,
  socialLinks: {
    linkedin: String,
  }
});

export const TeamModel = mongoose.model("TeamMember", TeamSchema);
