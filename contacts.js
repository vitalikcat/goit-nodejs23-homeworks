const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const foundContact = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );
    console.log("Found contact: ", foundContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const updatedContacts = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    console.table(updatedContacts);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("error: ", error);
    }

    let contactToAdd = {
      name: name,
      email: email,
      phone: phone,
    };

    let contacts = JSON.parse(data);
    contacts.push(contactToAdd);

    contacts.forEach((contact, index) => {
      contact.id = index;
    });

    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts: listContacts,
  getContactById: getContactById,
  removeContact: removeContact,
  addContact: addContact,
};
