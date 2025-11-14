import ExpressError from '../middleware/ExpressError.js';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import { userSchemaValidate } from "../schemaValidation/userSchemaValidate.js"

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Register new user
export const register = async (req, res, next) => {
    const { error, value } = userSchemaValidate.validate(req.body, { abortEarly: false, stripUnknown: true })
    if (error) return next(new ExpressError(401, error.details[0].message))
    const { name, email, password } = value;
    const userExists = await User.findOne({ email });
    if (userExists) return next(new ExpressError(400, 'User already exists'))
    const user = await User.create({ name, email, password });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
};

// Login user
export const login = async (req, res, next) => {
    console.log("1. login starts")
    const { error, value } = userSchemaValidate.validate(req.body, { abortEarly: false, stripUnknown: true })
    console.log("2. login starts")
    console.log("values: ", value)
    if (error) return next(new ExpressError(400, error.details[0].message))
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError(401, "Invalid email or password"));
    console.log("3. login starts")
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
