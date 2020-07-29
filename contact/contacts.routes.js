import { Router } from "express";
import {
  addContactValidation,
  updateContactValidation,
} from "./contact.validation";
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} from "./contacts.controller";

const contactsRouter = Router();

contactsRouter.get("/", getContactsController);
contactsRouter.get("/:id", getContactByIdController);
contactsRouter.post("/", addContactValidation, addContactController);
contactsRouter.delete("/:id", deleteContactController);
contactsRouter.patch("/:id", updateContactValidation, updateContactController);

export default contactsRouter;
