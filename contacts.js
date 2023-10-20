const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, './db/contacts.json');
const { v4: uuidv4 } = require('uuid');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try{
  const contacts =await listContacts();
  const contact = contacts.find(cont => cont.id === contactId);
  return contact||null;}
  catch(error){
    throw error;
  }
}

async function removeContact(contactId) {
 
  try{
    const contacts = await listContacts();
    const index = contacts.findIndex(cont => cont.id === contactId);

  if(index === -1){
    return null;
  }
  const removedContact = contacts[index];
  contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return removedContact;
  }catch(error){
    throw error;
  }
  
};

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }}


module.exports = { listContacts, getContactById, removeContact, addContact };