import Joi from "joi";

export const blogsSchemaValidate = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Title is required",
        "any.required": "Title is required"
    }),
    summary: Joi.string().required().messages({
        "string.empty": "Summary is required",
        "any.required": "Summary is required"
    }),
});