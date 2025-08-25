import jwt from "jsonwebtoken";
import { AdminModel } from "../models/auth.models.js";
import { asyncHandling } from "../utils/error-Handling.js";


export const verifyTokenAdmin = asyncHandling(async (req, res, next) => {
  let token = req.headers.authorization || req.headers.authorization.startsWith("Bearer ");

  if (!token) {
    const error = new Error("Not auhorized , Token faild");
    error.statusCode = 403;
    throw error;
  }

  if ( token ) {
    token= token.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const IdAdmin = await AdminModel.findById(decoded.id);
      req.admin = IdAdmin; 
      next();
  }


});