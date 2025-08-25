import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

  username: { type: String },
    message: { type: String },
    email: { type: String},

})
export const ContactModel = mongoose.model("contact", contactSchema);
