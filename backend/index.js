const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./services/database");
const config = require("./config/config");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "*",//frontend link 
  credentials: true
}));

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// Routes
const uploadRoute = require("./routes/uploadRoute");
const customerRoute = require("./routes/customerRoute");
const bookingRoute = require("./routes/bookingRoute");
const bookingDetailsRoute = require("./routes/bookingdetailsRoute");
const roomRoute = require("./routes/roomRoute");
const offerRoute = require("./routes/offerRoute");
const roomAmenityRoute = require("./routes/roomamenityRoute");
const adminRoute = require("./routes/adminRoute");
const fqaRoute = require("./routes/FQA_Route");
const customerTestimonialRoute = require("./routes/customerTestimonalRoute");
const contactusRoute = require("./routes/contactusRoute");
const hotelAmenityRoute = require("./routes/hotel_amenityRoute");
const property_infoRoute = require("./routes/property_infoRoute");
const booking_historyRoute = require("./routes/booking_historyRoute");
const room_categoryRoute = require("./routes/room_categoryRoute");


app.use("/api/upload", uploadRoute);

app.use("/customer", customerRoute);
app.use("/booking", bookingRoute);
app.use("/booking-details", bookingDetailsRoute);
app.use("/room", roomRoute);
app.use("/offer", offerRoute);
app.use("/room-amenity", roomAmenityRoute);
app.use("/admin", adminRoute);
app.use("/FQA", fqaRoute);
app.use("/customer-testimonial", customerTestimonialRoute);
app.use("/contact-us", contactusRoute);
app.use("/hotel-amenity", hotelAmenityRoute);
app.use("/property-info", property_infoRoute);
app.use("/booking-history", booking_historyRoute);
app.use("/room-category", room_categoryRoute);


(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database synced");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
