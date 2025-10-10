const Services = require("../models/service");


async function createServices(req, res) {
  try {
    const { service_name, service_images, service_description } = req.body;

    const services = await Services.create({
      service_name,
      service_images,
      service_description,
    });

    res.status(201).json({ success: true, services });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getServices(req, res) {
  try { 
    const services = await Services.findAll();
    res.status(200).json({ success: true, services });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { service_name, service_images, service_description } = req.body;

    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.update({
      service_name,
      service_images,
      service_description,
    });

    res.status(200).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteService(req, res) {
  try {
    const { id } = req.params;
    const service = await Services.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.destroy();

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createServices,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
