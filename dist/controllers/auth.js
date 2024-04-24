"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = exports.ForgotPassword = exports.VerifyOTP = exports.SignIn = exports.SignUp = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
// ========================================================
// *********************** SIGNUP *************************
// ========================================================
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = yield models_1.User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json("User with this email already exists");
        }
        // Hash the password
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        // Create a new user
        const newUser = yield models_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        // const token = await tokenize({email, password});
        const { _id, username, email: userEmail } = newUser;
        res
            .status(201)
            .json({ message: "User created successfully", profile: { _id, username, email: userEmail } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.SignUp = SignUp;
// ========================================================
// *********************** SIGNIN *************************
// ========================================================
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Compare the provided password with the stored hash
        const passwordMatch = yield (0, utils_1.comparePassword)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const { _id, username, email: userEmail } = user;
        res
            .status(200)
            .json({ message: "User logged in successfully", profile: { _id, username, email: userEmail } });
        // Generate a JWT token
        //  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        // Return the token
        // res.json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.SignIn = SignIn;
// ========================================================
// ********************** VERIFY OTP **********************
// ========================================================
const VerifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.VerifyOTP = VerifyOTP;
// ========================================================
// ********************* FORGOT PASSWORD ******************
// ========================================================
const ForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ error: "User not found with this email address." });
        }
        // mail(email);
        res
            .status(200)
            .json({ message: "Password reset email sent successfully." });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.ForgotPassword = ForgotPassword;
// ========================================================
// ******************** RESETPASSWORD *********************
// ========================================================
const ResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid User Credential");
        }
        const hashedPassword = (0, utils_1.hashPassword)(password);
        // user.password = hashedPassword;
        yield user.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.ResetPassword = ResetPassword;
