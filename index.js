const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts
        .getContactById(id)
        .then((res) => console.log("foundUser: ", res));
      break;

    case "add":
      contacts.addContact(name, email, phone).then((res) => console.table(res));
      break;

    case "remove":
      contacts.removeContact(id).then((res) => console.table(res));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
