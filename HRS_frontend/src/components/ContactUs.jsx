"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    related_subject: "",
    message: "",
  });
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_name: contactForm.name,
          email: contactForm.email, // <-- send email
          related_subject: contactForm.related_subject,
          message: contactForm.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Thank you! Your message has been sent.");
        setContactForm({
          name: "",
          email: "",
          related_subject: "",
          message: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message: " + error.message);
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-br from-gray-50 to-amber-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          We'd love to hear from you
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDEBAR */}
          <div className="space-y-8">
            <div className="flex items-start group hover:bg-white p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="bg-gradient-to-br from-amber-600 to-orange-500 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                <MapPin className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  New Baneshwor,Kathmandu
                  <br />
                  Ward 18
                </p>
              </div>
            </div>

            <div className="flex items-start group hover:bg-white p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="bg-gradient-to-br from-amber-600 to-orange-500 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                <Phone className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Phone</h3>
                <p className="text-gray-600">(+977)9841143456</p>
              </div>
            </div>

            <div className="flex items-start group hover:bg-white p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="bg-gradient-to-br from-amber-600 to-orange-500 p-4 rounded-xl mr-5 group-hover:scale-110 transition-transform">
                <Mail className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">Email</h3>
                <p className="text-gray-600">reservations@serenityhotel.com</p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors text-gray-900"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors text-gray-900"
              />

              <input
                type="text"
                placeholder="Related Subject"
                value={contactForm.related_subject}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    related_subject: e.target.value,
                  })
                }
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors text-gray-900"
                required
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors resize-none text-gray-900"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-amber-700 hover:to-orange-600 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
