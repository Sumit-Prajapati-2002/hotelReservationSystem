"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  Settings,
  LogOut,
  Home,
  BookOpen,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardCards from "../Admin Components/DashboardCards";
import UsersSection from "../Admin Components/UserSection";
import BookingsSection from "../Admin Components/BookingSection";
import RoomCategoriesSection from "../Admin Components/RoomCategories";
import RoomsSection from "../Admin Components/RoomsSection";
import AmenitiesSection from "../Admin Components/AmenitiesSection";
import FAQSection from "../Admin Components/FAQSection";
import OffersSection from "../Admin Components/OffersSection";
import TestimonialsSection from "../Admin Components/TestimonialsSection";
import ContactSection from "../Admin Components/ContactSection";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home, key: "dashboard" },
    { name: "Users", icon: Users, key: "users" },
    { name: "Bookings", icon: Calendar, key: "bookings" },
    { name: "Room Categories", icon: Tag, key: "roomCategories" },
    { name: "Rooms", icon: BookOpen, key: "rooms" },
    { name: "Amenities", icon: Settings, key: "amenities" },
    { name: "FAQs", icon: MessageSquare, key: "faq" },
    { name: "Offers", icon: Tag, key: "offers" },
    { name: "Testimonials", icon: Users, key: "testimonials" },
    { name: "Contact Us", icon: MessageSquare, key: "contact" },
  ];

  const handleLogout = () => {
    navigate("/admin-login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardCards />;
      case "users":
        return <UsersSection />;
      case "bookings":
        return <BookingsSection />;
      case "roomCategories":
        return <RoomCategoriesSection />;
      case "rooms":
        return <RoomsSection />;
      case "amenities":
        return <AmenitiesSection />;
      case "faq":
        return <FAQSection />;
      case "offers":
        return <OffersSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-2xl rounded-tr-3xl rounded-br-3xl p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-600 mb-8">
            Admin Panel
          </h2>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeSection === item.key
                    ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {activeSection}
          </h1>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all">
            Add New {activeSection}
          </button>
        </div>

        {renderSection()}
      </div>
    </div>
  );
}
