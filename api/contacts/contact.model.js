import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  subscription: { type: String, required: true },
  token: { type: String, required: isMyFieldRequired },
});

function isMyFieldRequired() {
  return typeof this.token === "string" ? false : true;
}

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(
    contactId,
    {
      $set: updateParams,
    },
    {
      new: true,
    }
  );
}

// contacts
const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
