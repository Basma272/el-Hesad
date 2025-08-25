import Joi from "joi";
import { generalvalidate } from "../utils/generalValidation.js";


export const loginVschema = Joi.object ({
 username: generalvalidate.username.required(),
 password: generalvalidate.password.required(),

})

export const contactVschema = Joi.object ({
    username: generalvalidate.username,
    email: generalvalidate.email,
    message: generalvalidate.message,

})


export const feedbackVschema = Joi.object ({
    username: generalvalidate.username,
    feedback: generalvalidate.message,
    rating: generalvalidate.rating,

})

