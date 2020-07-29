import path from "path";
import fs from "fs";
import util from "util";

const contactsPath = path.join(__dirname, "../db/contacts.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export const listContacts = async () => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getById = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    // const id = parsedContacts[parsedContacts.length - 1].id + 1;
    const newContact = {
      // id: id,
      name: name,
      email: email,
      phone: phone,
    };
    parsedContacts.push(newContact);
    console.log("parsedContacts: ", parsedContacts);
    parsedContacts.forEach((contact, index) => (contact.id = index));
    await writeFile(contactsPath, JSON.stringify(parsedContacts));
    return parsedContacts;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const match = parsedContacts.some((contact) => contact.id === contactId);

    if (match) {
      const newContacts = parsedContacts.filter(
        (contact) => contact.id !== contactId
      );
      newContacts.forEach((contact, index) => (contact.id = index));
      return await writeFile(contactsPath, JSON.stringify(newContacts));
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateContact = async (contactId, fieldsToUpdate) => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");
    let parsedContacts = JSON.parse(contacts);
    const foundContact =
      parsedContacts.find((contact) => contact.id === contactId) || null;

    if (foundContact) {
      const index = parsedContacts.indexOf(foundContact);
      Object.assign(parsedContacts[index], fieldsToUpdate);

      await writeFile(contactsPath, JSON.stringify(parsedContacts));
      return parsedContacts[index];
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
