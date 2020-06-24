import Joi from "@hapi/joi";
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

export const validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(403).send(validationResult.error);
  } else {
    next();
  }
};

export const validateUpdateUser = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().allow(""),
  });

  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  } else {
    next();
  }
};

export const validateUserId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Bad request");
  } else {
    next();
  }
};
