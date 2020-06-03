import contactModel from "./contact.model";
import Joi from "@hapi/joi";
import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

export const validateContact = (req, res, next) => {
  const contactValidSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
    token: Joi.string().allow("").required(),
  });

  const validationResult = contactValidSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(403).send(validationResult.error);
  }

  next();
};

export const validateUpdateContact = (req, res, next) => {
  const contactValidSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string().allow(""),
  });

  const validationResult = contactValidSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Bad request");
  }

  next();
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactModel.find();

    return res.status(200).json(contacts);
  } catch (error) {
    next(err);
  }
};

export const createContact = async (req, res) => {
  try {
    const createdContact = await contactModel.create(req.body);

    return res.status(201).json(createdContact);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    const foundUser = await contactModel.findById(contactId);

    if (!foundUser) {
      return res.status(404).send();
    } else {
      return res.status(200).json(foundUser);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    const deletedContact = await contactModel.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).send("Not found!");
    } else {
      return res.status(204).json(deletedContact);
    }
  } catch (error) {
    next(error);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactBody = req.body;

    const updatedContact = await contactModel.findContactByIdAndUpdate(
      contactId,
      contactBody
    );

    console.log("updatedContact", updatedContact);

    if (!updatedContact) {
      return res.status(404).send();
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
