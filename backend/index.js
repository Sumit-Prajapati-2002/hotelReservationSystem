const express = require("express");
const sequelize = require("./services/database");
const customerRoute = require("./routes/customerRoute");
const bookingRoute = require("./routes/bookingRoute");
const bookingDetailsRoute = require("./routes/bookingdetailsRoute");
const roomRoute = require("./routes/roomRoute");
const offerRoute = require("./routes/offerRoute");
const roomAmenityRoute = require("./routes/roomamenityRoute");
const adminRoute = require("./routes/adminRoute");
const fqaRoute = require("./routes/FQA_Route");
const serviceRoute = require("./routes/serviceRoute");
const customerTestimonialRoute = require("./routes/customerTestimonalRoute");
const contactusRoute = require("./routes/contactusRoute");
const hotelAmenityRoute = require("./routes/hotel_amenityRoute");
const property_infoRoute = require("./routes/property_infoRoute");
const booking_historyRoute = require("./routes/booking_historyRoute");

const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use("/customer", customerRoute);
app.use("/booking", bookingRoute);
app.use("/booking-details", bookingDetailsRoute);
app.use("/room", roomRoute);
app.use("/offer", offerRoute);
app.use("/room-amenity", roomAmenityRoute);
app.use("/admin", adminRoute);
app.use("/FQA", fqaRoute);
app.use("/service", serviceRoute);
app.use("/customer-testimonial", customerTestimonialRoute);
app.use("/contact-us", contactusRoute);
app.use("/hotel-amenity", hotelAmenityRoute);
app.use("/property-info", property_infoRoute);
app.use("/booking-history", booking_historyRoute);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("database Synced");
  } catch (err) {
    console.error("database connection failed due to", err);
  }
})();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
