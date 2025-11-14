import Joi from "joi";

export const userSchemaValidate = Joi.object({
  // name: Joi.string().messages({
  //   "string.empty": "Name is required",
  //   "any.required": "Name is required"
  // }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required"
  }),
}).options({ stripUnknown: true });
