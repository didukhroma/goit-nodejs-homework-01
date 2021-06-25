// contacts.js
const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, '/db/contacts.json')

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (err) {
    console.log(err)
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts()
    const contactsId = contacts.find(
      (contact) => contact.id === Number(contactId)
    )
    return contactsId
  } catch (error) {
    console.log(err)
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts()
    //check contactId
    const idArr = data.map((contact) => contact.id)
    if (!idArr.includes(Number(contactId))) {
      console.log('Sorry, this contact is not in the database')
      return
    }
    //deleted contact
    const result = data.filter((contact) => contact.id !== Number(contactId))
    fs.writeFile(contactsPath, `${JSON.stringify(result)}`, (err) => {
      throw err
    })
    console.log('This contact deleted from database')
  } catch (error) {
    console.log(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts()
    //generate ID
    const contactsId = data.map((contact) => contact.id)
    const newId = Math.max(...contactsId) + 1
    const newContact = { id: newId, name, email, phone }
    //find duplicated names
    const contactsName = data.map((contact) => contact.name)
    if (contactsName.includes(name)) {
      console.log('This contact already exists in the database')
      return
    }
    //add contact
    const newContacts = [...data, newContact]
    fs.writeFile(contactsPath, `${JSON.stringify(newContacts)}`, (err) => {
      throw err
    })
    console.log('New contact is added!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}
