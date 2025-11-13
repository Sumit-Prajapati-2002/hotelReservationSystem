import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HotelAmenities from "./components/HotelAmenities";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import FAQSection from "./components/FAQSection";
import RoomCategory from "./components/RoomCategory";

export default function HotelLandingPage() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <RoomCategory />
      <HotelAmenities />
      <Testimonials />
      <FAQSection />
      <AboutUs />
      <ContactUs />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
