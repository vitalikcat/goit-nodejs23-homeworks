import User from "../users/user.model";
import bcrypt from "bcrypt";
import { salt } from "../../config/index";
import { createToken } from "./auth.token";

export const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.userModel.findOne({ email });

    if (!foundUser) {
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
    } else {
      return res.status(409).json({ message: "Email in use" });
    }
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.userModel.findOne({ email });

    console.log("Found user: ", foundUser);

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
