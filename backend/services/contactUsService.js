const Contactus = require("../models/ContactUs");

async function createContactusService(data) {
  return await Contactus.create(data);
}

async function getAllContactusService() {
  return await Contactus.findAll();
}

async function getContactusByIdService(id) {
  return await Contactus.findByPk(id);
}

async function updateContactusService(id, data) {
  const contact = await Contactus.findByPk(id);
  if (!contact) return null;

  await contact.update(data);
  return contact;
}

async function deleteContactusService(id) {
  const contact = await Contactus.findByPk(id);
  if (!contact) return null;

  await contact.destroy();
  return true;
}

module.exports = {
  createContactusService,
  getAllContactusService,
  getContactusByIdService,
  updateContactusService,
  deleteContactusService,
};
