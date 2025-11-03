import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rooms from "./components/Room";
import HotelAmenities from "./components/HotelAmenities";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import FAQSection from "./components/FAQSection";
export default function HotelLandingPage() {
  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Rooms />
      <HotelAmenities />
      <Testimonials />
      <FAQSection />  
      <AboutUs />
      <ContactUs />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
