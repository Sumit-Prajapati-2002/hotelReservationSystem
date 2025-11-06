import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin
                className="text-amber-600 mt-1 mr-4 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600">
                  123 Ocean Drive, Paradise Bay
                  <br />
                  Miami, FL 33139, USA
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone
                className="text-amber-600 mt-1 mr-4 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail
                className="text-amber-600 mt-1 mr-4 flex-shrink-0"
                size={24}
              />
              <div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">Email</h3>
                <p className="text-gray-600">reservations@serenityhotel.com</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
