const yargs = require("yargs");
const data = require("./contacts");

const argv = yargs
  .number("id")
  .string("name")
  .string("email")
  .string("phone")
  .alias("name", "n")
  .alias("email", "e")
  .alias("phone", "p").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      data.listContacts();
      break;

    case "get":
      data.getContactById(id);
      break;

    case "add":
      data.addContact(name, email, phone);
      break;

    case "remove":
      data.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
