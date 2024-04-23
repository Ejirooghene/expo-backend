import { Request, Response } from "express";
import { IUser, User } from "../models";
import { hashPassword, comparePassword, tokenize } from "../utils";
import bcrypt, { genSalt } from "bcrypt";

// ========================================================
// *********************** SIGNUP *************************
// ========================================================

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json("User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // const token = await tokenize({email, password});
 
    const { _id, username, email: userEmail } = newUser;

    res
      .status(201)
      .json({ message: "User created successfully", profile: { _id, username, email: userEmail }  });
  } catch (error) {
    console.log(error);   
    res.status(500).json({ error: "Internal Server Error" });  
  } 
};

// ========================================================
// *********************** SIGNIN *************************
// ========================================================
 
export const SignIn = async (req: Request, res: Response) => {
  try { 
    const { email, password } = req.body;  

    // Find the user by email
    const user = await User.findOne({ email });  
 
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { _id, username, email: userEmail } = user;
  
    res
    .status(200)
    .json({ message: "User logged in successfully", profile: { _id, username, email: userEmail }  }); 


    // Generate a JWT token
    //  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Return the token
    // res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================================================
// ********************** VERIFY OTP **********************
// ========================================================
 
export const VerifyOTP = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================================================
// ********************* FORGOT PASSWORD ******************
// ========================================================

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found with this email address." });
    }

    // mail(email);

    res
      .status(200)
      .json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================================================
// ******************** RESETPASSWORD *********************
// ========================================================

export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid User Credential");
    }

    const hashedPassword = hashPassword(password);

    // user.password = hashedPassword;

    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 