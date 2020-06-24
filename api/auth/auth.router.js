import { Router } from "express";
import { authValidation } from "./auth.validator";
import {
  registrationController,
  loginController,
  logoutController,
} from "./auth.controller.js";
import { tokenMiddleware } from "./auth.token";

const authRouter = Router();

authRouter.post("/register", authValidation, registrationController);
authRouter.post("/login", tokenMiddleware, authValidation, loginController);
authRouter.patch("/logout", tokenMiddleware, logoutController);

export default authRouter;
