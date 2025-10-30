const sequelize = require("../services/database");
const { QueryTypes } = require("sequelize");

async function searchBookingsService({
  checkIn_date,
  checkOut_date,
  firstname,
  lastname,
  phone_no,
  email,
  status,
}) {
  let query = `
    SELECT
      b."booking_id",
      b."checkIn_date",
      b."checkOut_date",
      b."status",
      b."total_price",
      b."num_guest",
      c."firstname",
      c."lastname",
      c."phone_no",
      c."email"
    FROM "Booking" b
    LEFT JOIN "Customer" c ON b."customer_id" = c."customer_id"
    WHERE 1=1
  `;

  const replacements = {};

  if (checkIn_date) {
    query += ` AND b."checkIn_date" = :checkIn_date`;
    replacements.checkIn_date = checkIn_date;
  }
  if (checkOut_date) {
    query += ` AND b."checkOut_date" = :checkOut_date`;
    replacements.checkOut_date = checkOut_date;
  }
  if (firstname) {
    query += ` AND c."firstname" ILIKE :firstname`;
    replacements.firstname = `%${firstname}%`;
  }
  if (lastname) {
    query += ` AND c."lastname" ILIKE :lastname`;
    replacements.lastname = `%${lastname}%`;
  }
  if (phone_no) {
    query += ` AND c."phone_no" = :phone_no`;
    replacements.phone_no = phone_no;
  }
  if (email) {
    query += ` AND c."email" ILIKE :email`;
    replacements.email = `%${email}%`;
  }
  if (status) {
    query += ` AND b."status" = :status`;
    replacements.status = status;
  }

  const bookings = await sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return bookings;
}

module.exports = { searchBookingsService };
