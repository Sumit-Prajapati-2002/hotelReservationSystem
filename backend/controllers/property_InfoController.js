const Property_Info = require("../models/property_info");


async function createPropertyInfo(req, res) {
  try {
    const { opening_time, closing_time, parking_info, pet_policy_info } =
      req.body;

    const propertyInfo = await Property_Info.create({
      opening_time,
      closing_time,
      parking_info,
      pet_policy_info,
    });

    res.status(201).json({ success: true, propertyInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getAllPropertyInfo(req, res) {
  try {
    const properties = await Property_Info.findAll();
    res.status(200).json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getPropertyInfoById(req, res) {
  try {
    const { id } = req.params;
    const property = await Property_Info.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Property info not found" });
    }

    res.status(200).json({ success: true, property });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function updatePropertyInfo(req, res) {
  try {
    const { id } = req.params;
    const { opening_time, closing_time, parking_info, pet_policy_info } =
      req.body;

    const property = await Property_Info.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Property info not found" });
    }

    await property.update({
      opening_time,
      closing_time,
      parking_info,
      pet_policy_info,
    });

    res.status(200).json({ success: true, property });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deletePropertyInfo(req, res) {
  try {
    const { id } = req.params;
    const property = await Property_Info.findByPk(id);

    if (!property) {
      return res.status(404).json({ error: "Property info not found" });
    }

    await property.destroy();
    res.status(200).json({ success: true, message: "Property info deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createPropertyInfo,
  getAllPropertyInfo,
  getPropertyInfoById,
  updatePropertyInfo,
  deletePropertyInfo,
};
