
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");


const path = require("path");
const { isUtf8 } = require("buffer");

const CONTACTS_PATH = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
  const data = await fs.readFile(CONTACTS_PATH, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((elem) => elem.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
    return newContact;
  }

async function deleteContact(contactId) {
  const contacts = await listContacts();
  const coincidence = contacts.findIndex((elem) => elem.id === contactId);
  if (coincidence === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(coincidence, 1);
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts));
  return removedContact;
}



module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
};
