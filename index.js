const service = require("./services/services");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/api/contacts", (req, res) => {
  return res.status(200).send(service.listContacts());
});

app.get("/api/contacts/:contactId", (req, res) => {
  const contactId = Number(req.params.contactId);
  let foundContact = service.getById(contactId);

  if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).send(foundContact);
  }
});

app.post(
  "/api/contacts",
  (req, res, next) => {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validationResult = Joi.validate(req.body, validationRules);

    if (validationResult.error) {
      const requiredField = validationResult.error.details[0].path[0];

      return res.status(400).json({
        message: `missing required ${requiredField} field`,
      });
    } else {
      next();
    }
  },
  (req, res) => {
    const contact = req.body;
    let addedContact = service.addContact(contact);

    res.status(201).send(addedContact);
  }
);

app.delete("/api/contacts/:contactId", (req, res) => {
  const contactId = Number(req.params.contactId);
  let removedContact = service.removeContact(contactId);

  if (removedContact === undefined) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).json({ message: "contact deleted" });
  }
});

app.patch(
  "/api/contacts/:contactId",
  (req, res, next) => {
    const validationRules = Joi.object({
      name: Joi.string(),
      phone: Joi.string(),
      number: Joi.string(),
    });
    const result = Joi.validate(req.body, validationRules);

    if (result.error || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "missing  fields",
      });
    }
    next();
  },
  (req, res) => {
    const contactId = Number(req.params.contactId);
    const fieldsToUpdate = req.body;

    let updatedContact = service.updateContact(contactId, fieldsToUpdate);

    if (updatedContact === undefined) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).send(updatedContact);
    }
  }
);

app.listen(PORT, (error) => {
  if (error) {
    return console.log("something bad happened", error);
  }
  console.log("Server is runnig on port: ", PORT);
});
