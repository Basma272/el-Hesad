import Joi from "joi";
import { generalvalidate } from "../utils/generalValidation.js";


export const loginVschema = Joi.object ({
 username: generalvalidate.username.required(),
 password: generalvalidate.password.required(),

})

export const contactVschema = Joi.object ({
    email: generalvalidate.email,
})


export const feedbackVschema = Joi.object ({
    rating: generalvalidate.rating,
})

