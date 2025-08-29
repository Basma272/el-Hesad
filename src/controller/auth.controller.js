import jwt from "jsonwebtoken";
import { AdminModel } from "../models/auth.models.js";
import { asyncHandling } from "../utils/error-Handling.js"
import { sucssesResponse } from "../utils/response-Handling.js"

export const login = asyncHandling (
  async (req, res) => {
    const { username, password } = req.body;

    const admin = await AdminModel.findOne({username})
    if(! admin){
        return res.status(401).json({ message: "Invalid username or password" });
    } 
    if (
      username === admin.username &&
      password === admin.password 
    ) 
    {
      // ✅ اعمل التوكن بالـ id
      const token = jwt.sign(
        { id: admin._id }, // هنا الـ id داخل الـ payload
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

     return sucssesResponse({
      res,
      status: 200,
      message: " welcome , admin",
      data: {
      token
      },

     });
  
    }

})

