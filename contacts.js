const path = require("path");
const fs = require("fs");
const util = require("util");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.listContacts = async () => {
  const contacts = await readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);
  console.table(parsedContacts);
};

exports.getContactById = async (contactId) => {
  const contacts = await readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts.find((contact) => contact.id === contactId) || null;
};

exports.removeContact = async (contactId) => {
  const contacts = await readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);
  let updatedContacts =
    parsedContacts.filter((contact) => contact.id !== contactId) || null;
  updatedContacts.forEach((contact, index) => (contact.id = index));
  await writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
};

exports.addContact = async (name, email, phone) => {
  const contacts = await readFile(contactsPath, "utf-8");
  let parsedContacts = JSON.parse(contacts);
  const id = parsedContacts[parsedContacts.length - 1].id + 1;
  const newContact = {
    id: id,
    name: name,
    email: email,
    phone: phone,
  };
  parsedContacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(parsedContacts));
  return parsedContacts;
};
