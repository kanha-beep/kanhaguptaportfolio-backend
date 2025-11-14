import ExpressError from '../middleware/ExpressError.js';
import Contact from '../models/contactSchema.js';
import { contactSchemaValidate } from "../schemaValidation/contactSchemaValidate.js"
// Register new user
export const contact = async (req, res, next) => {
    console.log("starts")
    const { error, value } = contactSchemaValidate.validate(req.body, { abortEarly: false, stripUnknown: true })
    console.log("error: ", error)
    if (error) return next(new ExpressError(401, error.details[0].message))
    const { name, email, message } = value;
    console.log("contact start to crarte", value)
    const contact = await Contact.create({ name, email, message });
    console.log("cntact created: ", contact)
    res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
    })
}