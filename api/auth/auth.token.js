import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../users/user.model";

export const createToken = async (userId) => {
  return await jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export const tokenMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.replace("Bearer ", "");

    let userId;

    if (token) {
      userId = await jwt.verify(token, process.env.JWT_SECRET).id;
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const foundUser = await User.userModel.findById(userId);

    if (foundUser) {
      req.user = foundUser;
      req.userId = userId;

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
