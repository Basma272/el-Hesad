import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

  username: { 
    en :{ type: String } ,
    ar :{ type: String }
  },
    message: { 
    en :{ type: String } ,
    ar :{ type: String }
    },
    email: { type: String},

})
export const ContactModel = mongoose.model("contact", contactSchema);
