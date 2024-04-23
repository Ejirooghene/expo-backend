import { Router } from "express";
import { SignUp, SignIn, ForgotPassword, ResetPassword } from "../controllers";

const router = Router();

router.post("/signup", SignUp)
router.post("/signin", SignIn)
router.post("/forgot-password", ForgotPassword)
router.post("/reset-password", ResetPassword)

export { router as auth };