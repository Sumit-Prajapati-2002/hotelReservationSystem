const Admin = require("../models/Admin");

async function createAdminService(data) {
  return await Admin.create(data);
}

async function getAllAdminsService() {
  return await Admin.findAll();
}

async function getAdminByIdService(id) {
  return await Admin.findByPk(id);
}

async function updateAdminService(id, data) {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.update(data);
  return admin;
}

async function deleteAdminService(id) {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.destroy();
  return true;
}

async function getAdminByEmailService(email) {
  return await Admin.findOne({ where: { email } });
}

module.exports = {
  createAdminService,
  getAllAdminsService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  getAdminByEmailService,
};
