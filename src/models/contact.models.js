import mongoose from "mongoose";
import dayjs from "dayjs";

const contactSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isread: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true, transform: true }, toObject: { virtuals: true, transform: true } }
);

// تعديل الشكل النهائي للـ JSON قبل ما يترجع
contactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format("YYYY-MM-DD HH:mm"); 
    ret.updatedAt = dayjs(ret.updatedAt).format("YYYY-MM-DD HH:mm");
    return ret;
  }
});

export const ContactModel = mongoose.model("Contact", contactSchema);