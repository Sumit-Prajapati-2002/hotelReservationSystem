"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail } from "lucide-react";

export default function ContactSection() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contact messages (admin only)
  const loadContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contact-us", {
        withCredentials: true,
      });
      if (Array.isArray(res.data.messages)) {
        setContacts(res.data.messages);
      } else {
        console.error("Invalid response format:", res.data);
        setContacts([]);
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Delete a contact message
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`http://localhost:3000/contact-us/${id}`, {
        withCredentials: true,
      });
      loadContacts();
    } catch (err) {
      console.error("Delete contact error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Contact Messages
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : contacts.length === 0 ? (
        <div className="flex justify-center">
          <div className="p-6 bg-gray-50 rounded-2xl shadow text-gray-400 flex items-center gap-2">
            <Mail className="w-5 h-5" /> No messages found.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {contacts.map((c) => (
            <div
              key={c.contact_id}
              className="p-6 bg-white rounded-3xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300 relative"
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {c.contact_name}
                </h3>
                <p className="text-gray-500 mt-1">{c.email}</p>
                <p className="text-gray-600 mt-2 font-medium">
                  {c.related_subject}
                </p>
                <p className="text-gray-600 mt-1">{c.message}</p>
              </div>

              <button
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors duration-200"
                onClick={() => handleDelete(c.contact_id)}
              >
                <Trash2 />
              </button>

              {/* Decorative envelope icon */}
              <svg
                className="absolute bottom-3 left-3 w-6 h-6 text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 4v16h20V4H2zm2 2h16v2l-8 5-8-5V6zm0 4.5L10.5 15 4 18.5V10.5zM12 15l8-5v8.5L12 15z" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
