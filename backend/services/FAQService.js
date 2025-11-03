const FAQ = require("../models/FAQ");

async function createFAQService(data) {
  return await FAQ.create(data);
}

async function getAllFAQService() {
  return await FAQ.findAll({
    attributes: ["question", "answer"],
    limit: 5,
  });
}

async function getFAQByIdService(id) {
  return await FAQ.findByPk(id);
}

async function updateFAQService(id, data) {
  const faq = await FAQ.findByPk(id);
  if (!faq) return null;

  await faq.update(data);
  return faq;
}

async function deleteFAQService(id) {
  const faq = await FAQ.findByPk(id);
  if (!faq) return null;

  await faq.destroy();
  return true;
}

module.exports = {
  createFAQService,
  getAllFAQService,
  getFAQByIdService,
  updateFAQService,
  deleteFAQService,
};
