import {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} from "./services";

export const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).send(contacts);
};

export const getContactByIdController = async (req, res, next) => {
  const contactId = Number(req.params.id);
  let foundContact = await getById(contactId);

  if (foundContact === null) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).send(foundContact);
  }
};

export const addContactController = async (req, res, next) => {
  const contact = req.body;
  let addedContact = await addContact(contact);

  res.status(201).send(addedContact);
};

export const deleteContactController = async (req, res, next) => {
  const contactId = Number(req.params.id);
  const result = await removeContact(contactId);

  if (result === null) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).json({ message: "contact deleted" });
  }
};

export const updateContactController = async (req, res, next) => {
  const contactId = Number(req.params.id);
  const fieldsToUpdate = req.body;
  let updatedContact = await updateContact(contactId, fieldsToUpdate);
  if (updatedContact === null) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).send(updatedContact);
  }
};
