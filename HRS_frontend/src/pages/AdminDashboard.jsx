"use client";

import { useState, useEffect } from "react";
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
import axios from "axios";

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
import RoomAmenitiesManager from "../Admin Components/RoomAmenitiesManager";
import AssignAmenitiesToCategory from "../Admin Components/AssignAmenitiesToCategory";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard"
  );
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);

  // Add AmenitiesSection to the imports

  // Inside menuItems, add a new key for Hotel Amenities (if not already)
  const menuItems = [
    { name: "Dashboard", icon: Home, key: "dashboard" },
    { name: "Users", icon: Users, key: "users" },
    { name: "Bookings", icon: Calendar, key: "bookings" },
    { name: "Room Categories", icon: Tag, key: "roomCategories" },
    { name: "Rooms", icon: BookOpen, key: "rooms" },
    { name: "Hotel Amenities", icon: Settings, key: "hotel_amenities" }, // new
    { name: "Room Amenities", icon: Settings, key: "room_amenities" },
    { name: "Assign Amenities", icon: Settings, key: "assignAmenities" },
    { name: "FAQs", icon: MessageSquare, key: "faq" },
    { name: "Offers", icon: Tag, key: "offers" },
    { name: "Testimonials", icon: Users, key: "testimonials" },
    { name: "Contact Us", icon: MessageSquare, key: "contact" },
  ];

  // Save last opened section
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Check admin authentication
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          setIsAuthenticated(true);
          setAdmin(res.data.admin);
        } else {
          navigate("/admin-login");
        }
      } catch (err) {
        console.error("Admin auth failed", err);
        navigate("/admin-login");
      } finally {
        setLoading(false);
      }
    };
    checkAdminAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/admin/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("activeSection");
      navigate("/admin-login");
    }
  };

  // In renderSection(), return the correct component for each key
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
      case "hotel_amenities":
        return <AmenitiesSection />; // Hotel Amenities manager
      case "room_amenities":
        return <RoomAmenitiesManager />; // Room amenities manager
      case "assignAmenities":
        return <AssignAmenitiesToCategory />; // Assign to category
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

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
        </div>

        {renderSection()}
      </div>
    </div>
  );
}
