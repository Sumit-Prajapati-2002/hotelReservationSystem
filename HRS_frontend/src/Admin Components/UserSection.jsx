"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Mail, Phone } from "lucide-react";

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/customer/", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.customers)) {
        setUsers(data.customers);
      } else {
        console.error("Failed to fetch customers", data);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user, index) => (
        <div
          key={user.email || index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
        >
          {/* Avatar + verified icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user.firstname?.charAt(0).toUpperCase()}
            </div>

            <CheckCircle className="text-green-500" size={24} />
          </div>

          {/* Name */}
          <h3 className="font-bold text-xl text-gray-900 mb-2">
            {user.firstname} {user.lastname}
          </h3>

          {/* User details */}
          <div className="space-y-2 text-sm">
            <p className="text-gray-600 flex items-center gap-2">
              <Mail size={16} className="text-amber-600" />
              {user.email}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={16} className="text-amber-600" />
              {user.phone_no}
            </p>

            <p className="text-gray-500 text-xs mt-3">
              Joined:{" "}
              {user.created_at
                ? new Date(user.created_at).toISOString().split("T")[0]
                : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
