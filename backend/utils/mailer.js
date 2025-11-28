const config = require("../config/config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465, // 587 is STARTTLS, 465 is SSL
  secure: true, // true for 465, false for 587
  auth: {
    user: config.email.user, // your gmail
    pass: config.email.password, // app password
  },
});

transporter.verify((err, success) => {
  if (err) console.log("Nodemailer verify failed:", err);
  else console.log("Nodemailer ready to send messages");
});

async function sendBookingEmail(to, booking) {
  try {
    const mailOptions = {
      from: `"Serenity Hotel" <${config.email.user}>`,
      to,
      subject: `Booking Confirmation (ID: ${booking.booking_id})`,
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Dear ${booking.customer_firstname},</p>
        <p>Your booking has been successfully confirmed.</p>

        <p><strong>Booking ID:</strong> ${booking.booking_id}</p>
        <p><strong>Check-In:</strong> ${booking.checkIn_date}</p>
        <p><strong>Check-Out:</strong> ${booking.checkOut_date}</p>
        <p><strong>Total Price:</strong> <b>Rs. ${booking.total_price}</b></p>

        <p>Thank you for choosing Serenity Hotel.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  }
}

module.exports = { sendBookingEmail };
