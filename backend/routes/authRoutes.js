import express from "express"
import { signUpHandler, loginHandler, verificationHandler, resetOtp, forgotPassword, changePassword } from "../controller/auth.js";

const authRoute = express.Router();

authRoute.post("/signUp", signUpHandler);

authRoute.post("/login", loginHandler); 

authRoute.post("/verify" , verificationHandler);

authRoute.post("/resetOtp", resetOtp);

authRoute.post("/forgotPassword", forgotPassword);

authRoute.post("/changePassword", changePassword);

export default authRoute 