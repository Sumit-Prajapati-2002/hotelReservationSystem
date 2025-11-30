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
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardCards from "../Admin Components/DashboardCards";
import UsersSection from "../Admin Components/UserSection";
import BookingsSection from "../Admin Components/BookingSection";
import RoomCategoriesSection from "../Admin Components/RoomCategoriesSection";
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
  const URL = import.meta.env.VITE_BACKEND_URL;

  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("activeSection") || "dashboard"
  );
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // MENU ITEMS
  const menuItems = [
    { name: "Dashboard", icon: Home, key: "dashboard" },
    { name: "Users", icon: Users, key: "users" },
    { name: "Bookings", icon: Calendar, key: "bookings" },
    { name: "Room Categories", icon: Tag, key: "roomCategories" },
    { name: "Rooms", icon: BookOpen, key: "rooms" },
    { name: "Hotel Amenities", icon: Settings, key: "hotel_amenities" },
    { name: "Room Amenities", icon: Settings, key: "room_amenities" },
    { name: "Assign Amenities", icon: Settings, key: "assignAmenities" },
    { name: "FAQs", icon: MessageSquare, key: "faq" },
    { name: "Offers", icon: Tag, key: "offers" },
    { name: "Testimonials", icon: Users, key: "testimonials" },
    { name: "Contact Us", icon: MessageSquare, key: "contact" },
  ];

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // AUTH CHECK
  useEffect(() => {
    if (!URL) {
      console.error("❌ BACKEND URL missing. Check .env");
      navigate("/admin-login");
      return;
    }

    const checkAdminAuth = async () => {
      try {
        const res = await axios.get(`${URL}/admin/me`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsAuthenticated(true);
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
  }, [URL, navigate]);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(`${URL}/admin/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("activeSection");
      navigate("/admin-login");
    }
  };

  // SWITCH COMPONENTS
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
        return <AmenitiesSection />;
      case "room_amenities":
        return <RoomAmenitiesManager />;
      case "assignAmenities":
        return <AssignAmenitiesToCategory />;
      case "faq":
        return <FAQSection />;
      case "offers":
        return <OffersSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <DashboardCards />;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* SIDEBAR */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl transition-all duration-300 flex flex-col`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-amber-400 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Settings size={24} />}
            </button>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
                  activeSection === item.key
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <item.icon
                  className={`${
                    sidebarOpen ? "w-5 h-5" : "w-6 h-6 mx-auto"
                  } group-hover:scale-110 transition-transform`}
                />

                {sidebarOpen && (
                  <span className="font-semibold">{item.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-red-400 hover:text-red-300 font-semibold rounded-xl hover:bg-gray-700/50 transition-all"
          >
            <LogOut size={18} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
            {activeSection}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
        </div>

        <div className="animate-fadeIn">{renderSection()}</div>
      </div>
    </div>
  );
}
