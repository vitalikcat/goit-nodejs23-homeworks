import { Router } from "express";
import { tokenMiddleware } from "../../api/auth/auth.token";
import {
  getCurrentUser,
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "./user.controller.js";
import {
  validateUser,
  validateUpdateUser,
  validateUserId,
} from "./user.validator.js";

const userRouter = Router();

userRouter.get("/", tokenMiddleware, getUsers);
userRouter.post("/", validateUser, createUser);
userRouter.get("/:id", tokenMiddleware, validateUserId, getUserById);
userRouter.delete("/:id", validateUserId, deleteUserById);
userRouter.put(
  "/:id",
  tokenMiddleware,
  validateUserId,
  validateUpdateUser,
  updateUserById
);
userRouter.patch("/current/", tokenMiddleware, getCurrentUser);

export default userRouter;
