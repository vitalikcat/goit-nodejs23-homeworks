import { Router } from "express";
import {
  getContacts,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
  validateContact,
  validateUpdateContact,
  validateId,
} from "./contact.controller";

const contactRouter = Router(); // Router нужен чтобы мы могли обьявлять маршруты в разных файлах.

contactRouter.get("/", getContacts);
contactRouter.post("/", validateContact, createContact);
contactRouter.get("/:id", validateId, getContactById);
contactRouter.delete("/:id", validateId, deleteContactById);
contactRouter.put("/:id", validateId, validateUpdateContact, updateContactById);

export default contactRouter;
