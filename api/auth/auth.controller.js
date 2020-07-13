import { v5 as uuidv5 } from "uuid";
import sgMail from "@sendgrid/mail";
import User from "../users/user.model";
import bcrypt from "bcrypt";
import { salt } from "../../config/index";
import { createToken } from "./auth.token";

export async function sendVerificationEmail(user) {
  const verificationToken = uuidv5.URL;
  const userId = user._id;
  console.log("user email: ", user.email);

  try {
    const updatedUser = await User.userModel.findByIdAndUpdate(
      userId,
      { verificationToken },
      { new: true }
    );

    if (updatedUser) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: user.email,
        from: "vitalik791@gmail.com",
        subject: "Email verification",
        html: `<a href="http://localhost:3000/auth/verify/${verificationToken}">Click to verify user</a>`,
      };

      await sgMail.send(msg);
      return updatedUser;
    } else {
      return console.log("User not found");
    }
  } catch (error) {
    return console.log("Error: ", error);
  }
}

export async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  try {
    const userToVerify = await User.userModel.findOne({ verificationToken });
    const userId = userToVerify._id;
    console.log("userToVerify: ", userToVerify);

    if (!userToVerify) {
      res.status(404).send("User not found");
    }

    await User.userModel.findByIdAndUpdate(userId, {
      $unset: { verificationToken: 1 },
    });

    return res.status(200).send("OK");
  } catch (error) {
    return res.status(404).send("User not found");
  }
}

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

        const createdUser = await User.userModel.create(newUser);

        await sendVerificationEmail(createdUser);

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
