const FQA = require("../models/FQA");

async function createFQAService(data) {
  return await FQA.create(data);
}

async function getAllFQAService() {
  return await FQA.findAll({
    attributes: ["question", "answer"],
    limit: 5,
  });
}

async function getFQAByIdService(id) {
  return await FQA.findByPk(id);
}

async function updateFQAService(id, data) {
  const fqa = await FQA.findByPk(id);
  if (!fqa) return null;

  await fqa.update(data);
  return fqa;
}

async function deleteFQAService(id) {
  const fqa = await FQA.findByPk(id);
  if (!fqa) return null;

  await fqa.destroy();
  return true;
}

module.exports = {
  createFQAService,
  getAllFQAService,
  getFQAByIdService,
  updateFQAService,
  deleteFQAService,
};
