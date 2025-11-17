const Admin = require("../models/Admin");
const sequelize = require("../services/database");
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
async function getAdminDashboardService() {
  try {
    // Total users
    const [totalUsersResult] = await sequelize.query(
      `SELECT COUNT(*) AS "totalUsers" FROM "Customer"` // quoted
    );
    const totalUsers = totalUsersResult[0].totalUsers;

    // Active bookings
    const [activeBookingsResult] = await sequelize.query(
      `SELECT COUNT(*) AS "activeBookings" FROM "Booking" WHERE status = 'booked'` // quoted
    );
    const activeBookings = activeBookingsResult[0].activeBookings;

    // Active offers
    const [activeOffersResult] = await sequelize.query(
      `SELECT COUNT(*) AS "activeOffers" FROM "Offer" WHERE is_active = true` // quoted
    );
    const activeOffers = activeOffersResult[0].activeOffers;

    return { totalUsers, activeBookings, activeOffers };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

module.exports = {
  createAdminService,
  getAllAdminsService,
  getAdminByIdService,
  updateAdminService,
  deleteAdminService,
  getAdminByEmailService,
  getAdminDashboardService,
};
