import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HotelAmenities from "../components/HotelAmenities";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import RoomCategory from "../components/RoomCategory";
import ExclusiveOffers from "../components/ExclusiveOffers";

export default function HotelLandingPage() {
  const location = useLocation();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Scroll if `?scroll=section` param exists
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("scroll");
    if (section) {
      setTimeout(() => {
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300); // wait for navbar & components to render
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <RoomCategory />
      <ExclusiveOffers />
      <HotelAmenities />
      <Testimonials />
      <FAQSection />
      <AboutUs />
      <ContactUs />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
