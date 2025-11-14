import Joi from "joi";

export const projectsSchemaValidate = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Project title is required",
    "any.required": "Project title is required"
  }),
  description: Joi.string().required().messages({
    "string.empty": "Project description is required",
    "any.required": "Project description is required"
  }),
  url_1: Joi.string().required().messages({
    "string.empty": "Project description is required",
    "any.required": "Project description is required"
  }),
  url_2: Joi.string().required().messages({
    "string.empty": "Project description is required",
    "any.required": "Project description is required"
  }),
});