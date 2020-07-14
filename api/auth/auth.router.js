import { Router } from "express";
import { authValidation } from "./auth.validator";
import {
  verifyEmail,
  registrationController,
  loginController,
  logoutController,
} from "./auth.controller.js";
import { tokenMiddleware } from "./auth.token";

const authRouter = Router();

authRouter.post("/register", authValidation, registrationController);
authRouter.post("/login", authValidation, loginController);
authRouter.patch("/logout", tokenMiddleware, logoutController);
authRouter.get("/verify/:verificationToken", verifyEmail);

export default authRouter;
