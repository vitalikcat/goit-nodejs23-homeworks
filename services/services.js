const path = require("path");
const fs = require("fs");

const contactsPath = path.join(__dirname, "../db/contacts.json");
console.log("contactsPath: ", contactsPath);

function listContacts() {
  let result;

  try {
    const parsedContacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    result = parsedContacts;
  } catch (error) {
    console.log("Error: ", error);
  }

  console.table(result);
  return result;
}

function getById(contactId) {
  let result;

  try {
    const parsedContacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    result = parsedContacts.find((item) => item.id === contactId);
  } catch (error) {
    console.log("Error: ", error);
  }

  console.log("foundContact: ", result);
  return result;
}

function addContact(contact) {
  let result;

  try {
    const parsedContacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    parsedContacts.push(contact);
    parsedContacts.forEach((item, index) => {
      item.id = index;
    });

    fs.writeFileSync(contactsPath, JSON.stringify(parsedContacts));

    result = parsedContacts[parsedContacts.length - 1];
  } catch (error) {
    console.log("Error: ", error);
  }

  console.log("AddedContact: ", result);
  return result;
}

function removeContact(contactId) {
  let result;

  try {
    const parsedContacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    const filteredContacts = parsedContacts.filter(
      (item) => item.id !== contactId
    );

    fs.writeFileSync(contactsPath, JSON.stringify(filteredContacts));

    result = parsedContacts.find((item) => item.id === contactId);
  } catch (error) {
    console.log("Error: ", error);
  }
  console.log("RemovedContact: ", result);
  return result;
}

function updateContact(id, contact) {
  let result;

  try {
    const parsedContacts = JSON.parse(fs.readFileSync(contactsPath, "utf-8"));
    const foundContact = parsedContacts.find((user) => user.id === id);

    parsedContacts[foundContact.id] = {
      ...parsedContacts[foundContact.id],
      ...contact,
    };

    fs.writeFileSync(contactsPath, JSON.stringify(parsedContacts));

    result = parsedContacts[foundContact.id];
  } catch (error) {
    console.log("Error: ", error);
  }
  console.log("UpdatedContact: ", result);
  return result;
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
