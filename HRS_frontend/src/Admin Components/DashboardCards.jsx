"use client";
import { useState, useEffect } from "react";
import { Users, Calendar, Tag } from "lucide-react";
import axios from "axios";

export default function DashboardCards() {
  const [data, setData] = useState({
    totalUsers: 0,
    activeBookings: 0,
    activeOffers: 0,
    totalRevenue: 0,
  });
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/dashboard`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setData(res.data.data);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  // Cards array using backend values
  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Active Bookings",
      value: data.activeBookings,
      icon: Calendar,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Offers",
      value: data.activeOffers,
      icon: Tag,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`bg-gradient-to-r ${card.color} p-4 rounded-xl shadow-lg`}
            >
              <card.icon size={28} className="text-white" />
            </div>
          </div>

          <h3 className="text-gray-600 font-semibold mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
