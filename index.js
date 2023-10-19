const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');

const argv = require('yargs').argv;


function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.log(contacts));
      break;

    case 'get':
      getContactById(id).then(contact => console.log(contact));
      break;

    case 'add':
      addContact(name, email, phone).then(contact => console.log(contact));
      break;

    case 'remove':
      removeContact(id).then(contact => console.log(contact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);






