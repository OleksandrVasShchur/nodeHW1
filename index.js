const operations = require("./contacts")
const argv = require("yargs").argv;

const callAction = async ({action, id, name, email, phone }) => {
    switch(action) {
        case "list":
            const contacts = await operations.listContacts();
            console.table(contacts);
            return;
        case "get":
            const contact = await operations.getContactById(id);
            console.log(contact);
            return;
        case "add":
            const newContact = await operations.addContact(name, email, phone);
            console.log(newContact);
            return;
        case "remove":
            const deleteContact = await operations.deleteContact(id);
            console.log(deleteContact);
            return;
        default:
            console.warn('cYour action does not match the available options. Try again.')          
    }
}

callAction(argv)