import { Router } from "express";
import { tokenMiddleware } from "../../api/auth/auth.token";
 05-images
import multer from "multer";
import path from "path";
import {
  updateAvatar,

import {
 master
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

 05-images
const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;

    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage: storage });


 master
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
05-images
userRouter.patch(
  "/avatars",
  tokenMiddleware,
  upload.single("avatar"),
  updateAvatar
);

 master

export default userRouter;
