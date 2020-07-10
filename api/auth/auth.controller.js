import User from "../users/user.model";
import bcrypt from "bcrypt";
import { salt } from "../../config/index";
import { createToken } from "./auth.token";

 05-images
export const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUserByEmail = await User.userModel.findOne({ email });

    if (foundUserByEmail) {
      return res.status(409).json({ message: "Email in use" });
    } else {
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.generateAvatar();

      const avatarName = await User.moveAvatarAndReturnAvatarName().then(
        (result) => result
      );

      let url = `http://localhost:3000/images/${avatarName}`;

      if (url) {
        const newUser = {
          ...req.body,
          password: hashedPassword,
          avatarURL: url,
        };
        await User.userModel.create(newUser);
        return res.status(201).send(newUser);
      }

export const registrationController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmailExist = await User.userModel.findOne({ email });

    if (isEmailExist) {
      return res.status(409).json({ message: "Email in use" });
    } else {
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { ...req.body, password: hashedPassword };
      await User.userModel.create(newUser);

      return res.status(201).send(newUser);
 master
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

 05-images
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.userModel.findOne({ email });

    if (foundUser) {
      const userId = foundUser._id;
      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (isValidPassword) {
        const token = await createToken(userId);
        const userWithToken = await User.updateToken(userId, token);

        return res.status(200).send(userWithToken);
      }

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.userModel.findOne({ email });
    const userId = foundUser._id;

    if (!foundUser) {
      return res.status(401).json({
        message: "Email or password wrong",
      });
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (isValidPassword) {
      const token = await createToken(userId);
      const userWithToken = await User.updateToken(userId, token);

      return res.status(200).send(userWithToken);
 master
    } else {
      return res.status(401).json({
        message: "Email or password wrong",
      });
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const foundUser = await User.userModel.findById(userId);

    if (foundUser) {
      await User.userModel.findByIdAndUpdate(userId, {
        $unset: { token: 1 },
      });

      return res.status(204).send("Token deleted");
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
