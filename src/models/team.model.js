//6️⃣ TeamMember Schema فريق العمل 
// models/Team.js
import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { 
    en:{ type: String, required: true },
    ar:{ type: String, required: true }
  },
  role: { 
    en:{ type: String, required: true },
    ar:{ type: String, required: true }
  },
  image: String,

  linkedin: String,

});

export const TeamModel = mongoose.model("TeamMember", TeamSchema);
