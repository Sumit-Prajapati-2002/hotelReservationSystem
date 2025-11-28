const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

async function findCustomerByEmail(email) {
  return await Customer.findOne({ where: { email } });
}

async function createNewCustomer(data) {
  return await Customer.create(data);
}

async function upgradeGuestToRegistered(existingCustomer, data) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  await existingCustomer.update({
    password: hashedPassword,
    guestCheckout: false,
    firstname: data.firstname,
    lastname: data.lastname,
    phone_no: data.phone_no,
    nationality: data.nationality,
    citizenship: data.citizenship,
  });

  return existingCustomer;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function findAllCustomers() {
  return await Customer.findAll({
    attributes: ["customer_id", "firstname", "email", "phone_no"],
  });
}

async function findCustomerById(id) {
  return await Customer.findByPk(id);
}

async function updateCustomerRecord(customer, updatedData) {
  if (updatedData.password) {
    updatedData.password = await hashPassword(updatedData.password);
  }

  await customer.update(updatedData);
  return customer;
}

async function deleteCustomerRecord(customer) {
  await customer.destroy();
}

async function verifyCustomerCredentials(email, password) {
  const customer = await findCustomerByEmail(email);
  if (!customer || !customer.password) return null;

  const isMatch = await bcrypt.compare(password, customer.password);
  return isMatch ? customer : null;
}

module.exports = {
  findCustomerByEmail,
  createNewCustomer,
  upgradeGuestToRegistered,
  hashPassword,
  findAllCustomers,
  findCustomerById,
  updateCustomerRecord,
  deleteCustomerRecord,
  verifyCustomerCredentials,
};
