import ExpressError from '../middleware/ExpressError.js';
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import { userSchemaValidate } from "../schemaValidation/userSchemaValidate.js"

// Generate JWT
const generateToken = (user) => jwt.sign({ id: user?._id, roles: user?.roles, name: user?.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
const isProd = process.env.NODE_ENV === 'production';
// Login user
export const login = async (req, res, next) => {
    const { error, value } = userSchemaValidate.validate(req.body, { abortEarly: false, stripUnknown: true })
    if (error) return next(new ExpressError(400, error.details[0].message))
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError(401, "User not found"));
    // console.log("found user",user)

    // const isMatch = await user.matchPassword(password);
    // console.log(isMatch)
    // if (!isMatch) return next(new ExpressError(401, "Invalid password"));
    const token = generateToken(user);
    res.cookie('cookie', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    }).status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
};
export const currentUser = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) return next(new ExpressError(401, "Unauthorized"));
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
}
export const logout = async (req, res, next) => {
    res.clearCookie('cookie', {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    })
    res.status(200).json({ message: "Logged out successfully" });
}